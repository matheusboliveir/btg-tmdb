import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  convertToParamMap,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { genreGuard } from './genre.guard';
import { TmdbService } from '../core/services/tmdb.service';
import { Genre } from '../core/@types/genre';
import { firstValueFrom, isObservable, map, of } from 'rxjs';

describe('genreGuard', () => {
  const state = {} as unknown as RouterStateSnapshot;
  const executeGuard = (route: ActivatedRouteSnapshot) =>
    TestBed.runInInjectionContext(() => genreGuard(route, state));

  beforeEach(() => {
    const genres: Genre[] = [
      {
        id: 1,
        name: 'terror',
      },
      {
        id: 2,
        name: 'ação',
      },
    ];

    const tmdbServiceSpy = jasmine.createSpyObj<TmdbService>(['getGenres']);

    tmdbServiceSpy.getGenres.and.returnValue(of(genres));

    TestBed.configureTestingModule({
      providers: [{ provide: TmdbService, useValue: tmdbServiceSpy }],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('deve deixar passar caso o id seja diferente de 0', () => {
    const route = {
      paramMap: convertToParamMap({ id: '1' }),
    } as unknown as ActivatedRouteSnapshot;

    const result = executeGuard(route);

    if (typeof result === 'boolean') {
      expect(result).toBeTrue();
    } else {
      throw new Error('Id com valor não passou direto');
    }
  });

  it('deve buscar o primeiro id de genero e redirecionar para ele caso o id seja 0', async () => {
    const route = {
      paramMap: {
        get: (key: string) => (key === 'id' ? '0' : null),
      },
      parent: {
        routeConfig: { path: '' },
        url: [],
        parent: null,
        children: [],
      },
      root: {
        routeConfig: { path: '' },
        url: [],
        parent: null,
        children: [],
      },
      routeConfig: { path: '' },
      url: [],
      children: [],
    } as unknown as ActivatedRouteSnapshot;

    const result = executeGuard(route);

    if (isObservable(result)) {
      const urlTree = (await firstValueFrom(result)) as UrlTree;
      expect(urlTree.toString()).toContain('/1/1');
    } else {
      throw new Error('Id 0 passou direto');
    }
  });
});
