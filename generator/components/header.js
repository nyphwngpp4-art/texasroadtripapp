'use strict';

const { escapeHtml } = require('../lib/html-escape');

// Slim top bar: business name on the left, a tappable call button on the
// right. On a phone this is the fastest path to "just call them" without
// scrolling, which is why it repeats the same tel: link the hero and CTA
// banner also offer.
function header(config) {
  const { name, phone, phoneDisplay } = config.business;

  return `
<header class="site-header container">
  <div class="site-header__name">${escapeHtml(name)}</div>
  <a class="call-button" href="tel:${escapeHtml(phone)}">Call ${escapeHtml(phoneDisplay)}</a>
</header>`;
}

module.exports = header;
