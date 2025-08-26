import { ResolveFn } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ListMoviesResolver } from '../core/@types/list-movies';
import { inject } from '@angular/core';
import { TmdbService } from '../core/services/tmdb.service';

export const nowPlayingResolver: ResolveFn<Observable<ListMoviesResolver>> = (
  route,
  state
) => {
  const page = Number(route.paramMap.get('page'));
  const tmdb = inject(TmdbService);

  return tmdb.getNowPlaying(page).pipe(
    map((response) => ({
      title: 'Filmes em Cartaz',
      movies: response.results,
      totalMovies: response.total_pages * 19,
    }))
  );
};
