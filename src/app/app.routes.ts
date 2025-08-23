import { Routes } from '@angular/router';
import { CoreRoutes } from './core/config/core-routes';
import { CartazComponent } from './pages/cartaz/cartaz.component';

export const routes: Routes = [
    {
        path: CoreRoutes.HOME,
        component: CartazComponent
    },
    {
        path: '**',
        redirectTo: CoreRoutes.HOME
    }
];
