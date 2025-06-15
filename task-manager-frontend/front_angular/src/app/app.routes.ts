import { Routes } from '@angular/router';
import { ProjectAdmin } from './pages/project-admin/project-admin';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', loadChildren: () => import('./pages/Home/home.route').then(m => m.HOME_ROUTES) },

  { path: 'home/project-admin', component: ProjectAdmin}
];
