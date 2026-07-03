'use strict';

const document = require('../components/document');
const header = require('../components/header');
const hero = require('../components/hero');
const services = require('../components/services');
const locationHours = require('../components/location-hours');
const ctaBanner = require('../components/cta-banner');
const footer = require('../components/footer');

// Body components are assembled here in a fixed order and handed to
// document.js as the page body. This is the one page layout the generator
// produces for v1 (see PLAN.md's "Out of scope" list) — there is no
// per-config way to reorder or omit a section.
const bodyComponents = [header, hero, services, locationHours, ctaBanner, footer];

// Renders a full page for one (config, preset) pair. This is the only
// function build.js calls to go from validated data to an HTML string.
function renderSite(config, preset) {
  const bodyHtml = bodyComponents.map((component) => component(config, preset)).join('\n');
  return document(config, preset, bodyHtml);
}

module.exports = { renderSite };
