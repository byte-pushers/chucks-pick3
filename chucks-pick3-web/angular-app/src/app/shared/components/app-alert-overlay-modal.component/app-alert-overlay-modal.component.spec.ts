import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAlertOverlayModalComponent } from './app-alert-overlay-modal.component';

describe('OverlayModalComponent', () => {
  let component: AppAlertOverlayModalComponent;
  let fixture: ComponentFixture<AppAlertOverlayModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAlertOverlayModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAlertOverlayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
