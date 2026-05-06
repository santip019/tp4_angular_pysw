import { Routes } from '@angular/router';
import { Punto2 } from './pages/punto2/punto2';
import { Punto3 } from './pages/punto3/punto3';


export const routes: Routes = [
    { path: '', component: Punto2 },
    { path: 'punto3', component: Punto3 }
];