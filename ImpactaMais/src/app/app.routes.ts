import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { HomePage } from './pages/home-page/home-page';

export const routes: Routes = [
    {
        path: 'login', 
        component: LoginPage,
        title: 'ImpactaMais • Login'
    },
    {
        path: '', 
        component: HomePage,
        title: 'ImpactaMais • Home'
    }
];
