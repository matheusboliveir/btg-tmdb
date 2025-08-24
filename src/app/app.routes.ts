import { genreGuard } from './guards/genre.guard';
import { Routes } from '@angular/router';
import { CoreRoutes } from './core/config/core-routes';
import { GenreComponent } from './pages/genre/genre.component';
import { ListMoviesComponent } from './pages/list-movies/list-movies.component';
import { nowPlayingResolver } from './resolvers/now-playing.resolver';
import { popularResolver } from './resolvers/popular.resolver';
import { genreMoviesResolver } from './resolvers/genre-movies.resolver';

export const routes: Routes = [
  {
    path: CoreRoutes.HOME,
    children: [
      {
        path: '',
        redirectTo: '1',
        pathMatch: 'full',
      },
      {
        path: ':page',
        resolve: { listMovies: nowPlayingResolver },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        component: ListMoviesComponent,
      },
    ],
  },
  {
    path: CoreRoutes.POPULAR,
    children: [
      {
        path: '',
        redirectTo: '1',
        pathMatch: 'full',
      },
      {
        path: ':page',
        resolve: { listMovies: popularResolver },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        component: ListMoviesComponent,
      },
    ],
  },
  {
    path: CoreRoutes.GENRE,
    component: GenreComponent,
    children: [
      {
        path: '',
        redirectTo: '0/1',
        pathMatch: 'full',
      },
      {
        path: ':id/:page',
        canActivate: [genreGuard],
        resolve: { listMovies: genreMoviesResolver },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        component: ListMoviesComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: CoreRoutes.HOME,
  },
];
