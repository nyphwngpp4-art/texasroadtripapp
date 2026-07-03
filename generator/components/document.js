'use strict';

const { escapeHtml } = require('../lib/html-escape');
const { renderCss } = require('../lib/css');
const { buildGoogleFontsHref } = require('../lib/google-fonts');

// The document component wraps every other component's output into a
// complete, valid HTML5 page. It owns the <head> (title, description,
// viewport, the one permitted external resource, and the inlined
// preset stylesheet) so that no other component needs to touch <head>.
//
// Signature matches every other component: (config, preset) => htmlString.
// bodyHtml is passed in as a third argument by render.js rather than being
// assembled here, so document.js stays agnostic of which sections exist.
function document(config, preset, bodyHtml) {
  const fontsHref = buildGoogleFontsHref(preset);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(config.meta.title)}</title>
<meta name="description" content="${escapeHtml(config.meta.description)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="${fontsHref}">
<style>${renderCss(preset)}</style>
</head>
<body>
${bodyHtml}
</body>
</html>
`;
}

module.exports = document;
