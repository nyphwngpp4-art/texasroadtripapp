'use strict';

// Escapes text for safe insertion into HTML element content or attribute
// values. Components must run every piece of config-supplied text through
// this before interpolating it into a template string — config files are
// hand-edited by non-developers and are not a trusted source of raw HTML.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = { escapeHtml };
