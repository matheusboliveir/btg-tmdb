import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  convertToParamMap,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';

import { genreMoviesResolver } from './genre-movies.resolver';
import { firstValueFrom, Observable, of } from 'rxjs';
import { ListMoviesResolver } from '../core/@types/list-movies';
import { TmdbService } from '../core/services/tmdb.service';
import { MovieResponseWithGenres } from '../core/@types/tmdb-api';
import { MovieWithGenres } from '../core/@types/movie';

describe('genreMoviesResolver', () => {
  const state = {} as unknown as RouterStateSnapshot;
  const executeResolver = (route: ActivatedRouteSnapshot) =>
    TestBed.runInInjectionContext(() => genreMoviesResolver(route, state));

  const responseMock: MovieResponseWithGenres = {
    page: 1,
    results: [
      {
        title: 'filme',
        poster_path: '/a.png',
        vote_average: 7.5,
        genres: [
          {
            id: 1,
            name: 'terror',
          },
        ],
      } as MovieWithGenres,
    ],
    total_pages: 1,
    total_results: 1,
    genrerName: 'terror',
  };

  beforeEach(() => {
    const tmdbServiceSpy = jasmine.createSpyObj<TmdbService>([
      'getMoviesByGenre',
    ]);

    tmdbServiceSpy.getMoviesByGenre.and.returnValue(of(responseMock));

    TestBed.configureTestingModule({
      providers: [{ provide: TmdbService, useValue: tmdbServiceSpy }],
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('deve fazer a busca dos filmes e devolver formatado para pagina como ListMoviesResolver', async () => {
    const route = {
      paramMap: convertToParamMap({ id: 1, page: 1 }),
    } as ActivatedRouteSnapshot;
    const result = await firstValueFrom(
      executeResolver(route) as Observable<ListMoviesResolver>
    );
    expect(result).toEqual({
      title: 'Filmes de terror',
      movies: responseMock.results,
      totalMovies: 19,
    });
  });
});
