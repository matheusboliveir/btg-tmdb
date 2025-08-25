import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ListMoviesResolver } from '../core/@types/list-movies';
import { TmdbService } from '../core/services/tmdb.service';

export const searchResolver: ResolveFn<Observable<ListMoviesResolver>> = (
  route,
  state
) => {
  const tmdb = inject(TmdbService);
  const search = route.paramMap.get('search') || '';
  const page = Number(route.paramMap.get('page')) || 1;

  return tmdb.getSearchMovie(search, page).pipe(
    map((result) => ({
      title: 'Pesquisa: ' + search,
      movies: result.results,
      totalMovies: result.total_pages * 19,
    }))
  );
};
