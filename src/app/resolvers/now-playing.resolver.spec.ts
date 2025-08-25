import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { nowPlayingResolver } from './now-playing.resolver';

describe('nowPlayingResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => nowPlayingResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
