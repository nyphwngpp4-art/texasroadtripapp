'use strict';

// Builds the single Google Fonts stylesheet href for a preset's heading and
// body fonts. This link is the *only* external resource CLAUDE.md permits
// in generated output, so it lives in exactly one place rather than being
// assembled ad hoc by each component.
//
// preset.fonts.<role>.googleFontParam is the family+weights string Google
// Fonts expects after "family=", e.g. "Playfair+Display:wght@600;700".
function buildGoogleFontsHref(preset) {
  const params = [preset.fonts.heading.googleFontParam, preset.fonts.body.googleFontParam]
    .map((param) => `family=${param}`)
    .join('&');
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}

module.exports = { buildGoogleFontsHref };
