'use strict';

const { escapeHtml } = require('../lib/html-escape');

// The page's first screen: headline, subhead, and a single primary
// call-to-action. Per PLAN.md the CTA is call-first — a tel: link, never a
// form — so there's nothing here for a visitor to fill out before they can
// reach the business.
function hero(config) {
  const { headline, subhead, ctaLabel } = config.hero;
  const { phone, phoneDisplay } = config.business;

  return `
<section class="hero container">
  <h1>${escapeHtml(headline)}</h1>
  <p class="hero__subhead">${escapeHtml(subhead)}</p>
  <a class="call-button" href="tel:${escapeHtml(phone)}">${escapeHtml(ctaLabel)}: ${escapeHtml(phoneDisplay)}</a>
</section>`;
}

module.exports = hero;
