/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HomePageService } from './homePage.service';

describe('Service: HomePage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomePageService]
    });
  });

  it('should ...', inject([HomePageService], (service: HomePageService) => {
    expect(service).toBeTruthy();
  }));
});
