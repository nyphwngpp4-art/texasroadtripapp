#!/usr/bin/env node
'use strict';

// Local-business static site generator. Usage:
//   node generator/build.js configs/<slug>.json
//
// Zero npm dependencies by design (see CLAUDE.md) — everything below uses
// only Node's built-in fs/path/os modules.

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const { validateConfig, validatePreset } = require('./lib/validate');
const { renderSite } = require('./lib/render');

const REPO_ROOT = path.join(__dirname, '..');

// Reads and JSON-parses a file, wrapping any error (missing file, bad
// JSON) in a message that names the file — bare JSON.parse errors don't
// say which file they came from, which matters once there's more than one
// config on disk.
function loadJson(filePath, description) {
  let raw;
  try {
    raw = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    throw new Error(`Could not read ${description} at ${filePath}: ${err.message}`);
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`${description} at ${filePath} is not valid JSON: ${err.message}`);
  }
}

// Recursively copies configs/assets/<slug>/ into the build output if that
// directory exists. Per CLAUDE.md, a missing or empty assets directory
// must never fail a build — a business with no photos yet still gets a
// working site.
function copyAssetsIfPresent(slug, targetDir) {
  const assetsSrc = path.join(REPO_ROOT, 'configs', 'assets', slug);
  if (!fs.existsSync(assetsSrc)) return;
  fs.cpSync(assetsSrc, path.join(targetDir, 'assets'), { recursive: true });
}

// Writes the built site to a fresh temp directory, then swaps it into
// dist/<slug>/ with rm+rename. The temp directory lives under dist/.tmp
// (same filesystem as the final destination) specifically so the final
// rename is a same-volume move rather than a cross-device copy, which
// could fail partway through and defeat the whole point of building to a
// temp dir first. dist/<slug>/ therefore only ever exists as either the
// previous complete build or the new complete build — never partial.
function writeBuildAtomically(slug, html) {
  const distRoot = path.join(REPO_ROOT, 'dist');
  const tmpParent = path.join(distRoot, '.tmp');
  fs.mkdirSync(tmpParent, { recursive: true });

  const tmpDir = fs.mkdtempSync(path.join(tmpParent, `${slug}-`));
  try {
    fs.writeFileSync(path.join(tmpDir, 'index.html'), html);
    copyAssetsIfPresent(slug, tmpDir);

    const finalDir = path.join(distRoot, slug);
    fs.rmSync(finalDir, { recursive: true, force: true });
    fs.renameSync(tmpDir, finalDir);
    return finalDir;
  } catch (err) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    throw err;
  }
}

function main() {
  const configArg = process.argv[2];
  if (!configArg) {
    console.error('Usage: node generator/build.js <path-to-config.json>');
    process.exit(1);
  }

  const configPath = path.resolve(process.cwd(), configArg);

  let finalDir;
  try {
    const config = loadJson(configPath, 'config');
    validateConfig(config);

    const presetPath = path.join(REPO_ROOT, 'generator', 'presets', `${config.preset}.json`);
    const preset = loadJson(presetPath, `preset "${config.preset}"`);
    validatePreset(preset);

    const html = renderSite(config, preset);
    finalDir = writeBuildAtomically(config.slug, html);
  } catch (err) {
    console.error(`Build failed: ${err.message}`);
    process.exit(1);
  }

  console.log(`Built ${path.relative(REPO_ROOT, finalDir)}/index.html`);
}

main();
