import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayModalComponent } from './overlay-modal.component';

describe('OverlayModalComponent', () => {
  let component: OverlayModalComponent;
  let fixture: ComponentFixture<OverlayModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverlayModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
