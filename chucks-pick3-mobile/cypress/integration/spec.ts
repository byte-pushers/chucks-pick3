const date = new Date();
const now = new Date();

describe('My First Test', () => {
  // @ts-ignore
  beforeEach(() => {
    cy.viewport('iphone-8');
  });

  it('Contains the state', () => {
    cy.visit('/');
    cy.contains('Texas');
  });

  it('looks for the element Day', () => {
    cy.visit('/');
    cy.contains('Day');
  });

  it('clicks on the drawTime button for evening', () => {
    cy.get('[id="draw.time.enum.evening"]').click({
      multiple: true,
      force: true,
    });
  });

  it('should search the pick3DrawDateCard ', () => {
    const stringDate = now.toDateString();
    cy.get('pick3-draw-date-info-section').find('span').contains(stringDate);
  });

  it('should swipe left', () => {
    cy.get('.swiper-slide-active')
      .trigger('pointerdown', { which: 1 })
      .trigger('pointermove', 'right')
      .trigger('pointerup', { force: true });
  });

  it('clicks on the drawTime button for day', () => {
    cy.get('[id="draw.time.enum.day"]').click({
      multiple: true,
      force: true,
    });
  });
  it('should search the pick3DrawDateCard ', () => {
    const stringDate = now.toDateString();
    cy.get('pick3-draw-date-info-section').find('span').contains(stringDate);
  });
});
