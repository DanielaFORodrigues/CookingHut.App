/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanActivateGuardService } from './can-activate-guard.service';

describe('Service: CanActivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateGuardService]
    });
  });

  it('should ...', inject([CanActivateGuardService], (service: CanActivateGuardService) => {
    expect(service).toBeTruthy();
  }));
});
