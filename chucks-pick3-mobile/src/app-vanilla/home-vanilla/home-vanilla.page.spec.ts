import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeVanillaPage } from './home-vanilla.page';
import {CardContextService} from '../../app/services/card-context.service';

describe('Vanilla Home Page Testing', () => {
  let component: HomeVanillaPage;
  let fixture: ComponentFixture<HomeVanillaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeVanillaPage ],
      imports: [IonicModule.forRoot()],
      providers: [CardContextService]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeVanillaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
