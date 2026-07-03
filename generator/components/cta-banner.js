'use strict';

const { escapeHtml } = require('../lib/html-escape');

// Full-width closing pitch before the footer — the last chance on the page
// to get a visitor to call rather than bounce.
function ctaBanner(config) {
  const { headline, label } = config.cta;
  const { phone, phoneDisplay } = config.business;

  return `
<section class="cta-banner">
  <h2>${escapeHtml(headline)}</h2>
  <a class="call-button" href="tel:${escapeHtml(phone)}">${escapeHtml(label)}: ${escapeHtml(phoneDisplay)}</a>
</section>`;
}

module.exports = ctaBanner;
