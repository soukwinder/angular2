import { Routes, RouterModule }  from '@angular/router';

import { Dashboard } from './dashboard.component';
import { ModuleWithProviders } from '@angular/core';

//config routing
export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
