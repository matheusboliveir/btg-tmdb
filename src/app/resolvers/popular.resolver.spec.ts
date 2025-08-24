import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { popularResolver } from './popular.resolver';

describe('popularResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => popularResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
