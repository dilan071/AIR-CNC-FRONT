import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
// Definición de rutas
export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirección a 'home'
    { path: 'home', component: HomeComponent }, // Página normal
    { path: 'index', component: IndexComponent }, // Página normal
    { path: '**', redirectTo: '/home' } // Manejo de rutas desconocidas
  ];
  
