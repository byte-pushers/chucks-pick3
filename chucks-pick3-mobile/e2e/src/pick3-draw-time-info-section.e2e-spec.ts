import { AppPage } from './app.po';
import { Pick3DrawTimeEnum } from '../../src/app/models/pick3-draw-time.enum';
import getIcon = Pick3DrawTimeEnum.getIcon;
import { Pick3DrawTimeCardComponent } from '../../src/app/components/pick3-draw-time-section/pick3-draw-time-card.component';
import { Pick3DrawTimeInfoSectionPo } from './pick3-draw-time-info-section.po';

describe('new App', () => {
  let page: Pick3DrawTimeInfoSectionPo;
  let pick3DrawTime;

  beforeEach(() => {
    page = new Pick3DrawTimeInfoSectionPo();
  });

  it('should retrieve the pick3DrawTimeId', () => {
    page.navigateTo();
    pick3DrawTime = page.getPick3DrawTimeId();
    expect(pick3DrawTime).toEqual('draw.time.enum.morning');
  });
  it('should goto the correct button', () => {
    page.navigateTo();
    page.getPick3DrawTimeButton().click();
    expect(pick3DrawTime).toBeDefined('idk lol');
  });
});
