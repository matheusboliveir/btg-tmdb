import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { genreMoviesResolver } from './genre-movies.resolver';
import { Observable } from 'rxjs';
import { ListMoviesResolver } from '../core/@types/list-movies';

describe('genreMoviesResolver', () => {
  const executeResolver: ResolveFn<Observable<ListMoviesResolver>> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => genreMoviesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
