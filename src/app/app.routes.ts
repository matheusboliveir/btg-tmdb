import { Routes } from '@angular/router';
import { CoreRoutes } from './core/config/core-routes';
import { CartazComponent } from './pages/cartaz/cartaz.component';
import { PopularComponent } from './pages/popular/popular.component';

export const routes: Routes = [
    {
        path: CoreRoutes.HOME,
        component: CartazComponent
    },
    {
        path: CoreRoutes.POPULAR,
        component: PopularComponent
    },
    {
        path: '**',
        redirectTo: CoreRoutes.HOME
    }
];
