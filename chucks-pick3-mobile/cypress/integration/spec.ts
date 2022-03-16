const date = new Date();
const now = new Date();

describe('My First Test', () => {
  // @ts-ignore

  it('Contains the state', () => {
    cy.visit('/');
    cy.contains('Texas');
  });

  it('looks for the element Day', () => {
    cy.visit('/');
    cy.contains('Day');
  });

  it('clicks on the drawTime button', () => {
    cy.viewport('iphone-8');
    cy.get('[id="draw.time.enum.evening"]').click({
      multiple: true,
      force: true,
    });
  });

  it('should search the pick3DrawDateCard ', () => {
    const stringDate = now.toDateString();
    cy.get('pick3-draw-date-info-section')
      .find('span')
      .should('have.class', 'draw-date-text')
      .contains(stringDate);
  });
});
