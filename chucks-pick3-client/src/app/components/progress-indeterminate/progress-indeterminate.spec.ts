'use strict';

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProgressIndeterminateComponent} from './progress-indeterminate';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('ProgressIndeterminate', () => {

  let root: DebugElement;
  let fixture: ComponentFixture<ProgressIndeterminateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressIndeterminateComponent],
    });

    fixture = TestBed.createComponent(ProgressIndeterminateComponent);

    root = fixture.debugElement.query(By.css('div.progress-materializecss'));
  });

  it('root contains only one nested div', () => {
      expect(root).toBeTruthy();
      expect(root.children.length).toEqual(1);
      expect(root.children[0].name).toEqual('div');
    });
});
