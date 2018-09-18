import {TestUtils} from "../../../test";
import {FutureSelectPage} from "./future-select.page";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {FutureSelectPageModule} from "./future-select.page.module";

describe('FutureSelectPage', () => {
  let instance: FutureSelectPage = null;
  let fixture: ComponentFixture<FutureSelectPage> = null;

  beforeEach(async(() => TestUtils.configureIonicTestingModule([], [FutureSelectPageModule]).compileComponents().then(() => {
    fixture = TestBed.createComponent(FutureSelectPage);
    instance = fixture.debugElement.componentInstance;
  })));

  it('should create a valid instance of FutureSelectPage', () => {
    expect(instance instanceof FutureSelectPage).toBe(true);
  });
});
