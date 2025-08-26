import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  convertToParamMap,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';

import { nowPlayingResolver } from './now-playing.resolver';
import { ListMoviesResolver } from '../core/@types/list-movies';
import { firstValueFrom, Observable, of } from 'rxjs';
import { MovieWithGenres } from '../core/@types/movie';
import { MovieResponseWithGenres } from '../core/@types/tmdb-api';
import { TmdbService } from '../core/services/tmdb.service';

describe('nowPlayingResolver', () => {
  const state = {} as unknown as RouterStateSnapshot;
  const executeResolver = (route: ActivatedRouteSnapshot) =>
    TestBed.runInInjectionContext(() => nowPlayingResolver(route, state));

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
    const tmdbServiceSpy = jasmine.createSpyObj<TmdbService>(['getNowPlaying']);

    tmdbServiceSpy.getNowPlaying.and.returnValue(of(responseMock));

    TestBed.configureTestingModule({
      providers: [{ provide: TmdbService, useValue: tmdbServiceSpy }],
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('deve fazer a busca dos filmes e devolver formatado para pagina como ListMoviesResolver', async () => {
    const route = {
      paramMap: convertToParamMap({ page: 1 }),
    } as ActivatedRouteSnapshot;
    const result = await firstValueFrom(
      executeResolver(route) as Observable<ListMoviesResolver>
    );
    expect(result).toEqual({
      title: 'Filmes em Cartaz',
      movies: responseMock.results,
      totalMovies: 19,
    });
  });
});
