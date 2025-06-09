import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/event-list/event-list').then(c => c.EventList),
  },
];
