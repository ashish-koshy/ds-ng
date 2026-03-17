import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'array',
    loadComponent: () =>
      import('./pages/array-visual/array-visual.component').then(
        (m) => m.ArrayVisualComponent,
      ),
  },
  {
    path: 'linked-list',
    loadComponent: () =>
      import('./pages/linked-list-visual/linked-list-visual.component').then(
        (m) => m.LinkedListVisualComponent,
      ),
  },
  {
    path: 'stack',
    loadComponent: () =>
      import('./pages/stack-visual/stack-visual.component').then(
        (m) => m.StackVisualComponent,
      ),
  },
  {
    path: 'queue',
    loadComponent: () =>
      import('./pages/queue-visual/queue-visual.component').then(
        (m) => m.QueueVisualComponent,
      ),
  },
  {
    path: 'tree',
    loadComponent: () =>
      import('./pages/tree-visual/tree-visual.component').then(
        (m) => m.TreeVisualComponent,
      ),
  },
  {
    path: 'graph',
    loadComponent: () =>
      import('./pages/graph-visual/graph-visual.component').then(
        (m) => m.GraphVisualComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
