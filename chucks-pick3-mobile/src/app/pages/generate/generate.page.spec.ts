import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneratePage } from './generate.page';

describe('GeneratePage', () => {
  let component: GeneratePage;
  let fixture: ComponentFixture<GeneratePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
