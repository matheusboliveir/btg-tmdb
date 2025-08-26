import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { nowPlayingResolver } from './now-playing.resolver';
import { ListMoviesResolver } from '../core/@types/list-movies';
import { Observable } from 'rxjs';

describe('nowPlayingResolver', () => {
  const executeResolver: ResolveFn<Observable<ListMoviesResolver>> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => nowPlayingResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
