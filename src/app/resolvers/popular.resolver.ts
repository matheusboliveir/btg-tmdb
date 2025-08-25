import { ResolveFn } from '@angular/router';
import { TmdbService } from '../core/services/tmdb.service';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ListMoviesResolver } from '../core/@types/list-movies';

export const popularResolver: ResolveFn<Observable<ListMoviesResolver>> = (
  route,
  state
) => {
  const page = Number(route.paramMap.get('page')) || 1;
  const tmdb = inject(TmdbService);

  return tmdb.getPopular(page).pipe(
    map((response) => ({
      title: 'Filmes Populares',
      movies: response.results,
      totalMovies: response.total_pages * 19,
    }))
  );
};
