import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { genreMoviesResolver } from './genre-movies.resolver';

describe('genreMoviesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => genreMoviesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
