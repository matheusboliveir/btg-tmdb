import { ResolveFn } from '@angular/router';
import { TmdbService } from '../core/services/tmdb.service';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ListMoviesResolver } from '../core/@types/list-movies';

export const genreMoviesResolver: ResolveFn<Observable<ListMoviesResolver>> = (
  route,
  state
) => {
  const id = Number(route.paramMap.get('id')) || 1;
  const page = Number(route.paramMap.get('page')) || 1;
  const tmdb = inject(TmdbService);

  return tmdb.getMoviesByGenre(id, page).pipe(
    map((response) => ({
      title: 'Filmes de ' + response.genrerName,
      movies: response.results,
      totalMovies: response.total_pages * 19,
    }))
  );
};
