import { RouterModule, Routes } from '@angular/router'; 
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from  './auth/pages/login/login.component';  // Asegúrate de que la ruta sea correcta
import { RegistroComponent } from './auth/pages/registro/registro.component';  // Asegúrate de que la ruta sea correcta
import { PerfilComponent } from './features/pages/perfil/perfil.component';
import { PropiedadesComponent } from './features/pages/propiedades/propiedades.component';
// Definición de rutas
export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent }, // Página normal
    { path: 'index', component: IndexComponent }, // Página normal
    { path: 'gestion-propiedades', component: PropiedadesComponent }, // Ruta para el login
    { path: 'mi-perfil', component: PerfilComponent }, // Ruta para el login
    { path: 'login', component: LoginComponent }, // Ruta para el login
    { path: 'registro', component: RegistroComponent }, // Ruta para el registro
    { path: '**', redirectTo: '/login' }
];