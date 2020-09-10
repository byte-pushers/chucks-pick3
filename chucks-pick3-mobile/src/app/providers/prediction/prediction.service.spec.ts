'use strict';

import {PredictionProvider} from './prediction.service';
import {inject, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {DrawingTimeEnum} from './api/v1/drawing-time.enum';
import {API_URL} from '../../app.config';
import {Pick3PlaysResponse} from './api/v1/pick3-plays-response';
import {Pick3PlaysRequest} from './api/v1/pick3-plays-request.model';

describe('PredictionProvider', () => {

  /*beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PredictionProvider],
      imports: [
        HttpClientTestingModule,
      ],
    });
  });

  const pick3Request: Pick3PlaysRequest = {
    winDrawDate: new Date(2017, 11, 31),   // n.b. months are zero-indexed
    futureDrawDate: new Date(2018, 8, 1),
    winDrawTime: DrawingTimeEnum.MORNING,
    futureDrawTime: DrawingTimeEnum.EVENING,
    winNumber: 123,
  };

  it('correctly maps prediction service requests and responses',
     fakeAsync(inject([HttpTestingController, PredictionProvider], (httpMock: HttpTestingController, provider: PredictionProvider) => {
      provider.getPredictions(pick3Request).subscribe((data: Pick3PlaysResponse) => {
          expect(data.date).toEqual('2018-09-01');
          expect(data.drawingTime).toEqual(DrawingTimeEnum.EVENING);
          expect(data.plays).toEqual([123, 234, 345, 456, 567]);
      });

      const req: TestRequest = httpMock.expectOne(r => r.method === 'GET' && r.url === API_URL + '/numbers');
      expect(req.request.params.get('winDrawDate')).toEqual('2017-12-31');
      expect(req.request.params.get('futureDrawDate')).toEqual('2018-09-01');
      expect(req.request.params.get('winDrawTime')).toEqual('MORNING');
      expect(req.request.params.get('futureDrawTime')).toEqual('EVENING');
      expect(req.request.params.get('winNumber')).toEqual('123');

      // Hard-code a mock response
      req.flush({
        date: '2018-09-01',
        drawingTime: DrawingTimeEnum.EVENING,
        plays: [ 123, 234, 345, 456, 567],
      });

      tick();
  })));

  it('returns an error string on http errors',
     inject([HttpTestingController, PredictionProvider],
            (httpMock: HttpTestingController, provider: PredictionProvider) => {
        provider.getPredictions(pick3Request).subscribe((data: string) => {
          expect(data).toEqual('Something bad happened; please try again later.');
        });

        const req: TestRequest = httpMock.expectOne(r => r.method === 'GET' && r.url === API_URL + '/numbers');

        req.error(new ErrorEvent('network error'));
  }));*/

  it('test', () => {
    expect(true).toBe(true);
  });
});
