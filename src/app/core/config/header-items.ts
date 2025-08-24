import { HeaderItem } from '../@types/header-item';
import { CoreRoutes } from './core-routes';

export const HeaderItems: HeaderItem[] = [
  {
    title: 'Em Cartaz',
    route: CoreRoutes.HOME,
  },
  {
    title: 'Populares',
    route: CoreRoutes.POPULAR,
  },
  {
    title: 'Gêneros',
    route: CoreRoutes.GENRE,
  },
];
