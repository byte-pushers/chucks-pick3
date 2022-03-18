// @ts-ignore
Cypress.Commands.add('swipeLeft', () => {
  cy.get('.swiper-slide-active')
    .trigger('mousedown', { position: 'left' })
    .trigger('mousemove', { clientX: 100, clientY: 275 })
    .trigger('mouseup', { force: true });
});
