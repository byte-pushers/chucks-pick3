import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneratePicksPage } from './generate-picks.page';

describe('GeneratePicksPage', () => {
  let component: GeneratePicksPage;
  let fixture: ComponentFixture<GeneratePicksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratePicksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratePicksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
