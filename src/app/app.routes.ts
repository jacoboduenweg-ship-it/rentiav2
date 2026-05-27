import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'bienvenida',
    loadComponent: () => import('./bienvenida/bienvenida.page').then( m => m.BienvenidaPage),
    data: { animation: 'forward' } 
  },
  {
    path: 'canjearvale',
    loadComponent: () => import('./canjearvale/canjearvale.page').then( m => m.CanjearvalePage)
  },
  {
    path: 'cambiarcontra1ra',
    loadComponent: () => import('./cambiarcontra1ra/cambiarcontra1ra.page').then( m => m.Cambiarcontra1raPage)
  },
  {
    path: 'cambiarcontra1ra',
    loadComponent: () => import('./cambiarcontra1ra/cambiarcontra1ra.page').then( m => m.Cambiarcontra1raPage)
  },
  {
    path: 'buscarvale',
    loadComponent: () => import('./buscarvale/buscarvale.page').then( m => m.BuscarvalePage)
  },
  {
    path: 'listado',
    loadComponent: () => import('./listado/listado.page').then( m => m.ListadoPage)
  },
  {
    path: 'historial',
    loadComponent: () => import('./historial/historial.page').then( m => m.HistorialPage)
  },
  {
    path: 'cambiarcontra',
    loadComponent: () => import('./cambiarcontra/cambiarcontra.page').then( m => m.CambiarcontraPage)
  },
  {
    path: 'descargarrecibo',
    loadComponent: () => import('./descargarrecibo/descargarrecibo.page').then( m => m.DescargarreciboPage)
  },
];
