'use strict';

const document = require('../components/document');

// Body components are assembled here in a fixed order and handed to
// document.js as the page body. Increment 0 ships with no body sections
// (the smoke test only proves the shell renders); Increment 1 adds
// header/hero/services/location-hours/cta-banner/footer to this list.
const bodyComponents = [];

// Renders a full page for one (config, preset) pair. This is the only
// function build.js calls to go from validated data to an HTML string.
function renderSite(config, preset) {
  const bodyHtml = bodyComponents.map((component) => component(config, preset)).join('\n');
  return document(config, preset, bodyHtml);
}

module.exports = { renderSite };
