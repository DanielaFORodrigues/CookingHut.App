import { TestBed } from '@angular/core/testing';

import { UserContextService } from './usercontext.service';

describe('UsercontextService', () => {
  let service: UserContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
