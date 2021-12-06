import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewPicksCardComponent } from './view-picks-card.component';
import {CardContextService} from "../../services/card-context.service";

describe('ViewPicksCardComponent', () => {
  let component: ViewPicksCardComponent;
  let fixture: ComponentFixture<ViewPicksCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPicksCardComponent ],
      imports: [IonicModule.forRoot()],
      providers: [CardContextService]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPicksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
