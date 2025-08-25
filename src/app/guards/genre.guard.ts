import { CoreRoutes } from './../core/config/core-routes';
import {
  CanActivateFn,
  createUrlTreeFromSnapshot,
  Router,
} from '@angular/router';
import { TmdbService } from '../core/services/tmdb.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const genreGuard: CanActivateFn = (route, state) => {
  const id = route.paramMap.get('id');

  if (id !== '0') {
    return true;
  }
  const tmdb = inject(TmdbService);

  return tmdb.getGenres().pipe(
    map((genres) => {
      const firstGenre = genres[0];
      return createUrlTreeFromSnapshot(route, ['../../', firstGenre.id, 1]);
    })
  );
};
