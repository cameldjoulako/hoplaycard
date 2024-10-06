import { Routes } from '@angular/router';
import { MonsterListComponent } from './pages/monster-list/monster-list.component';
import { MonsterComponent } from './pages/monster/monster.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: 'home',
    component: MonsterListComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'monster',
    children: [
      {
        path: '',
        component: MonsterComponent,
      },
      {
        path: ':id',
        component: MonsterComponent,
      },
    ],
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
