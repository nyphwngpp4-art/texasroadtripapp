'use strict';

const { escapeHtml } = require('../lib/html-escape');

// footer.text is a single hand-written line (business name/tagline) rather
// than a structured object, since footer copy varies too much across
// businesses to be worth modeling further for v1. Address/phone/hours are
// re-derived from the same business/hours config that hero and
// location-hours already use, so there's exactly one place to edit them.
function footer(config) {
  const { name, phone, phoneDisplay, address } = config.business;
  const year = config.footer.copyrightYear || new Date().getFullYear();

  return `
<footer class="site-footer container">
  <p>${escapeHtml(config.footer.text)}</p>
  <p>
    ${escapeHtml(address.line1)}, ${escapeHtml(address.city)}, ${escapeHtml(address.state)} ${escapeHtml(address.zip)}
    &middot; <a href="tel:${escapeHtml(phone)}">${escapeHtml(phoneDisplay)}</a>
  </p>
  <p>&copy; ${escapeHtml(String(year))} ${escapeHtml(name)}. All rights reserved.</p>
</footer>`;
}

module.exports = footer;
