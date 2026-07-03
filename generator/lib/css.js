'use strict';

// Renders a preset into a single inline <style> block. There is no Tailwind
// and no external stylesheet (besides the Google Fonts link) — every rule
// a generated page needs lives in this string, built from the preset's
// color/font/radius tokens. Class names here are the contract components
// render against; if you rename a class in a component, rename it here too.
function renderCss(preset) {
  const c = preset.colors;
  const radius = preset.radius;

  return `
    :root {
      --color-primary: ${c.primary};
      --color-primary-dark: ${c.primaryDark};
      --color-accent: ${c.accent};
      --color-background: ${c.background};
      --color-surface: ${c.surface};
      --color-text: ${c.text};
      --color-text-muted: ${c.textMuted};
      --radius: ${radius};
      --font-heading: '${preset.fonts.heading.family}', serif;
      --font-body: '${preset.fonts.body.family}', sans-serif;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      background: var(--color-background);
      color: var(--color-text);
      font-family: var(--font-body);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3 {
      font-family: var(--font-heading);
      line-height: 1.15;
      margin: 0 0 0.5em;
    }

    p { margin: 0 0 1em; }

    a { color: inherit; }

    .container {
      max-width: 960px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Call links are the primary interaction on a phone — make them large
       enough to tap without precision and visually distinct as buttons. */
    .call-button {
      display: inline-block;
      background: var(--color-primary);
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      padding: 14px 28px;
      border-radius: var(--radius);
      min-height: 44px;
      line-height: 16px;
    }
    .call-button:hover, .call-button:active { background: var(--color-primary-dark); }
    .call-button--outline {
      background: transparent;
      color: var(--color-primary);
      border: 2px solid var(--color-primary);
      padding: 12px 26px;
    }

    .site-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 16px 0;
      flex-wrap: wrap;
    }
    .site-header__name {
      font-family: var(--font-heading);
      font-size: 1.4rem;
      font-weight: 700;
    }

    .hero {
      padding: 48px 0 56px;
      text-align: center;
    }
    .hero h1 { font-size: 2.25rem; }
    .hero__subhead {
      font-size: 1.1rem;
      color: var(--color-text-muted);
      max-width: 40em;
      margin: 0 auto 1.5em;
    }

    .services {
      padding: 48px 0;
      background: var(--color-surface);
    }
    .services__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      margin-top: 24px;
    }
    .service-card {
      background: var(--color-background);
      border-radius: var(--radius);
      padding: 20px;
    }
    .service-card h3 { font-size: 1.1rem; }
    .service-card__price {
      display: inline-block;
      margin-top: 8px;
      font-weight: 600;
      color: var(--color-accent);
    }

    .location {
      padding: 48px 0;
    }
    .location__grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;
    }
    @media (min-width: 640px) {
      .location__grid { grid-template-columns: 1fr 1fr; }
    }
    .hours-table {
      width: 100%;
      border-collapse: collapse;
    }
    .hours-table td {
      padding: 6px 0;
      border-bottom: 1px solid var(--color-surface);
    }
    .hours-table td:last-child { text-align: right; color: var(--color-text-muted); }
    .directions-link { display: inline-block; margin-top: 12px; text-decoration: underline; }

    .cta-banner {
      background: var(--color-primary);
      color: #fff;
      text-align: center;
      padding: 48px 20px;
    }
    .cta-banner h2 { color: #fff; }
    .cta-banner .call-button { background: #fff; color: var(--color-primary); }
    .cta-banner .call-button:hover, .cta-banner .call-button:active { background: var(--color-surface); }

    .site-footer {
      padding: 32px 0;
      color: var(--color-text-muted);
      font-size: 0.9rem;
      text-align: center;
    }
    .site-footer a { text-decoration: underline; }
  `;
}

module.exports = { renderCss };
