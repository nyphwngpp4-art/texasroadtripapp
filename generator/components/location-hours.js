'use strict';

const { escapeHtml } = require('../lib/html-escape');

// Address + hours side by side. The "Get Directions" link points at a
// Google Maps search URL rather than an embedded map iframe — CLAUDE.md
// permits only the Google Fonts <link> as an external *resource* the page
// loads on its own; a plain outbound <a href> the visitor chooses to click
// is not a resource the page fetches, so it stays within that constraint.
function buildDirectionsHref(address) {
  const query = `${address.line1}, ${address.city}, ${address.state} ${address.zip}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function hoursRow(entry) {
  return `<tr><td>${escapeHtml(entry.days)}</td><td>${escapeHtml(entry.time)}</td></tr>`;
}

function locationHours(config) {
  const { address } = config.business;
  const directionsHref = buildDirectionsHref(address);

  return `
<section class="location container">
  <h2>Visit Us</h2>
  <div class="location__grid">
    <div>
      <p>
        ${escapeHtml(address.line1)}<br>
        ${escapeHtml(address.city)}, ${escapeHtml(address.state)} ${escapeHtml(address.zip)}
      </p>
      <a class="directions-link" href="${directionsHref}">Get Directions</a>
    </div>
    <div>
      <table class="hours-table">
        <tbody>${config.hours.map(hoursRow).join('')}</tbody>
      </table>
    </div>
  </div>
</section>`;
}

module.exports = locationHours;
