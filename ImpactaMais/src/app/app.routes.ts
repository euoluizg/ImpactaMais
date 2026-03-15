import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { ContatoPage } from './pages/contato-page/contato-page';

export const routes: Routes = [
    {
        path: 'login', 
        component: LoginPage,
        title: 'ImpactaMais • Login'
    },
    {
        path: 'contato', 
        component: ContatoPage,
        title: 'ImpactaMais • Contato'
    }
];
