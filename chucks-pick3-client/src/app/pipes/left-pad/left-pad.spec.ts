'use strict';

import {inject, TestBed} from "@angular/core/testing";
import {LeftPadPipe} from "./left-pad";
import {PipesModule} from "../pipes.module";
describe('LeftPadPipe', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeftPadPipe],
      imports: [
        PipesModule,
      ],
    });
  });


  it('does not add to strings of exact length' ,
    inject([LeftPadPipe],
      (pipe: LeftPadPipe) => {
        expect(pipe.transform("abc", "3", "0")).toEqual("abc");
        expect(pipe.transform("abc", "3", "x")).toEqual("abc");
      }));


  it('extra characters get padded on left' ,
    inject([LeftPadPipe],
      (pipe: LeftPadPipe) => {
        expect(pipe.transform("abc", "6", "0")).toEqual("000abc");
        expect(pipe.transform("abc", "5", "x")).toEqual("xxabc");
      }));

  it('padding negative characters returns original string' ,
    inject([LeftPadPipe],
      (pipe: LeftPadPipe) => {
        expect(pipe.transform("abc", "-123", "x")).toEqual("abc");
        expect(pipe.transform("abc", "-1", "a")).toEqual("abc");
      }));

  it('padding zero characters returns original string' ,
    inject([LeftPadPipe],
           (pipe: LeftPadPipe) => {
      expect(pipe.transform("abc", "0", "x")).toEqual("abc");
      expect(pipe.transform("abc", "0", "a")).toEqual("abc");
    }));

});
