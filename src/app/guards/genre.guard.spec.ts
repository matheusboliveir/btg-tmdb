import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { genreGuard } from './genre.guard';

describe('genreGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => genreGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
