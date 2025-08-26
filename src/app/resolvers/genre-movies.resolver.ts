import { ResolveFn } from '@angular/router';
import { TmdbService } from '../core/services/tmdb.service';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ListMoviesResolver } from '../core/@types/list-movies';

export const genreMoviesResolver: ResolveFn<Observable<ListMoviesResolver>> = (
  route,
  state
) => {
  const id = Number(route.paramMap.get('id'));
  const page = Number(route.paramMap.get('page'));
  const tmdb = inject(TmdbService);

  return tmdb.getMoviesByGenre(id, page).pipe(
    map((response) => ({
      title: 'Filmes de ' + response.genrerName,
      movies: response.results,
      totalMovies: response.total_pages * 19,
    }))
  );
};
