import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  convertToParamMap,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';

import { searchResolver } from './search.resolver';
import { firstValueFrom, Observable, of } from 'rxjs';
import { ListMoviesResolver } from '../core/@types/list-movies';
import { MovieWithGenres } from '../core/@types/movie';
import { MovieResponseWithGenres } from '../core/@types/tmdb-api';
import { TmdbService } from '../core/services/tmdb.service';

describe('searchResolver', () => {
  const state = {} as unknown as RouterStateSnapshot;
  const executeResolver = (route: ActivatedRouteSnapshot) =>
    TestBed.runInInjectionContext(() => searchResolver(route, state));

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
      'getSearchMovie',
    ]);

    tmdbServiceSpy.getSearchMovie.and.returnValue(of(responseMock));

    TestBed.configureTestingModule({
      providers: [{ provide: TmdbService, useValue: tmdbServiceSpy }],
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('deve fazer a busca dos filmes e devolver formatado para pagina como ListMoviesResolver', async () => {
    const route = {
      paramMap: convertToParamMap({ search: 'resident evil', page: 1 }),
    } as ActivatedRouteSnapshot;
    const result = await firstValueFrom(
      executeResolver(route) as Observable<ListMoviesResolver>
    );
    expect(result).toEqual({
      title: 'Pesquisa: resident evil',
      movies: responseMock.results,
      totalMovies: 19,
    });
  });
});
