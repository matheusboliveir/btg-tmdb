import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { popularResolver } from './popular.resolver';
import { ListMoviesResolver } from '../core/@types/list-movies';
import { Observable } from 'rxjs';

describe('popularResolver', () => {
  const executeResolver: ResolveFn<Observable<ListMoviesResolver>> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => popularResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
