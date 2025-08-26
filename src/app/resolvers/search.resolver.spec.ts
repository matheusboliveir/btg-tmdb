import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { searchResolver } from './search.resolver';
import { Observable } from 'rxjs';
import { ListMoviesResolver } from '../core/@types/list-movies';

describe('searchResolver', () => {
  const executeResolver: ResolveFn<Observable<ListMoviesResolver>> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => searchResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
