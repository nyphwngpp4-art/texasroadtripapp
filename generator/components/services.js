'use strict';

const { escapeHtml } = require('../lib/html-escape');

// One card per service. priceFrom is optional per service — configs for a
// business that doesn't want to publish prices yet can omit it entirely.
function serviceCard(service) {
  const price = service.priceFrom
    ? `<span class="service-card__price">from ${escapeHtml(service.priceFrom)}</span>`
    : '';

  return `
  <div class="service-card">
    <h3>${escapeHtml(service.name)}</h3>
    <p>${escapeHtml(service.description)}</p>
    ${price}
  </div>`;
}

function services(config) {
  const cards = config.services.map(serviceCard).join('');

  return `
<section class="services">
  <div class="container">
    <h2>Services</h2>
    <div class="services__grid">${cards}
    </div>
  </div>
</section>`;
}

module.exports = services;
