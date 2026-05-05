import { Routes } from '@angular/router';
import { Actividad1 } from './pages/actividad1/actividad1';
import { Punto3 } from './pages/punto3/punto3';


export const routes: Routes = [
    { path: '', component: Actividad1 },
    { path: 'punto3', component: Punto3 }
];