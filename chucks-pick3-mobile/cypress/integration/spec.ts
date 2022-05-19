import { Pick3DrawTimeCardDomain } from '../../src/app/models/pick3-draw-time-card.domain';
import { Pick3DrawTimeEnum } from '../../src/app/models/pick3-draw-time.enum';
import { Pick3LotteryService } from '../../src/app/services/pick3-lottery.service';
import { Pick3DrawDateCardDomain } from '../../src/app/models/pick3-draw-date-card.domain';

const date = new Date();
const now = new Date();

describe('My First Test', () => {
  const data = new Pick3DrawDateCardDomain({
    drawDate: date,
    drawState: 'gotoHome',
    drawTime: Pick3DrawTimeEnum.MORNING,
    drawTimeAsString: 'Morning',
    upcomingDrawTime: date,
    hasWinner: false,
    backgroundImage: Pick3LotteryService,
    winningNumber: 462,
    winningNumberDigits: [4, 6, 2],
    drawDateIcon: date,
    slideNumber: 7,
    defaultDrawDateTime: Pick3DrawTimeEnum.MORNING,
    slideName: 'Home',
  });
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

    cy.contains(stringDate);
  });

  it('should swipe left', () => {
    cy.get('.swiper-slide-active').trigger('pointerdown', { which: 1 }).trigger('pointermove', 'right').trigger('pointerup', { force: true });
  });

  it('clicks on the drawTime button for day', () => {
    cy.get('[id="draw.time.enum.day"]').click({
      multiple: true,
      force: true,
    });
  });
  it('should search the pick3DrawDateCard ', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const stringDate = yesterday.toDateString();
    cy.contains(stringDate);
  });

  it('should swipe right', () => {
    cy.get('.swiper-slide-active').trigger('pointerdown', { which: 1 }).trigger('pointermove', 'left').trigger('pointerup', { force: true });
  });

  it('should goto select-picks', function () {
    cy.get('[id="generate-picks-icon"]').click({
      multiple: true,
      force: true,
    });
  });

  it('should check if continue-button is false', function () {
    cy.get('[id="continueButton"]').should('have.value', 'false');
  });

  it('should click on continue button to continue', function () {
    cy.get('[id="continueButton"]').click({
      multiple: true,
      force: true,
    });
  });
  it('should check if generate-button is false', function () {
    cy.get('[id="generateButton"]').should('have.value', 'true');
  });
  it('should click on generate button to continue', function () {
    cy.get('[id="generateButton"]').click({
      multiple: true,
      force: true,
    });
  });
});
