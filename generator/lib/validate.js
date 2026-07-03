'use strict';

// Reads a dotted path ("business.address.zip") out of a nested object.
// Returns undefined if any segment along the way is missing, which is what
// lets requireString/requireArray below report a clean "missing" error
// instead of throwing a TypeError on `undefined.foo`.
function getPath(obj, keyPath) {
  return keyPath
    .split('.')
    .reduce((node, key) => (node && typeof node === 'object' ? node[key] : undefined), obj);
}

// Every required-field check in this file throws a plain Error whose
// message names the exact field path that failed. build.js is the only
// caller that catches these — it prints the message and exits non-zero.
// That's the whole validation contract: a hand-edited config with a typo
// or a missing field should fail loudly and specifically, never silently
// render a broken page.
function requireString(source, keyPath, label) {
  const value = getPath(source, keyPath);
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Missing or invalid required field: ${label || keyPath} (expected a non-empty string)`);
  }
  return value;
}

function requireArray(source, keyPath, { minLength = 1, label } = {}) {
  const value = getPath(source, keyPath);
  if (!Array.isArray(value) || value.length < minLength) {
    throw new Error(
      `Missing or invalid required field: ${label || keyPath} (expected an array with at least ${minLength} item(s))`
    );
  }
  return value;
}

// Validates a loaded site config. Throws on the first problem found —
// config files are small enough that "fix one, rerun" is fine, and a
// single clear error beats a wall of them.
function validateConfig(config) {
  requireString(config, 'slug');
  requireString(config, 'preset');
  requireString(config, 'meta.title');
  requireString(config, 'meta.description');

  requireString(config, 'business.name');
  requireString(config, 'business.phone');
  requireString(config, 'business.phoneDisplay');
  requireString(config, 'business.address.line1');
  requireString(config, 'business.address.city');
  requireString(config, 'business.address.state');
  requireString(config, 'business.address.zip');

  requireString(config, 'hero.headline');
  requireString(config, 'hero.subhead');
  requireString(config, 'hero.ctaLabel');

  const services = requireArray(config, 'services');
  services.forEach((_, i) => {
    requireString(config, `services.${i}.name`);
    requireString(config, `services.${i}.description`);
  });

  const hours = requireArray(config, 'hours');
  hours.forEach((_, i) => {
    requireString(config, `hours.${i}.days`);
    requireString(config, `hours.${i}.time`);
  });

  requireString(config, 'cta.headline');
  requireString(config, 'cta.label');

  requireString(config, 'footer.text');
}

// Validates a loaded preset. Kept separate from validateConfig because a
// preset is shared across many configs and fails independently of them.
function validatePreset(preset) {
  requireString(preset, 'id');

  requireString(preset, 'colors.primary');
  requireString(preset, 'colors.primaryDark');
  requireString(preset, 'colors.accent');
  requireString(preset, 'colors.background');
  requireString(preset, 'colors.surface');
  requireString(preset, 'colors.text');
  requireString(preset, 'colors.textMuted');

  requireString(preset, 'fonts.heading.family');
  requireString(preset, 'fonts.heading.googleFontParam');
  requireString(preset, 'fonts.body.family');
  requireString(preset, 'fonts.body.googleFontParam');

  requireString(preset, 'radius');
}

module.exports = { validateConfig, validatePreset, getPath, requireString, requireArray };
