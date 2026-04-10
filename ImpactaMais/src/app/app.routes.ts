import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { HomePage } from './pages/home-page/home-page';
import { SendCodePage } from './pages/send-code-page/send-code-page';
import { SignupPage } from './pages/signup-page/signup-page';
import { TermsPage } from './pages/terms-page/terms-page';

export const routes: Routes = [
    {
        path: '', 
        component: HomePage,
        title: 'ImpactaMais • Home'
    },
    {
        path: 'login', 
        component: LoginPage,
        title: 'ImpactaMais • Login'
    },
    {
        path: 'signup', 
        component: SignupPage,
        title: 'ImpactaMais • Cadastro'
    },
    {
        path: 'termos',
        component: TermsPage,
        title: 'ImpactaMais • Termos de Uso'
    },
    {
        path: 'enviar-codigo',
        component: SendCodePage,
        title: 'ImpactaMais • Enviar Código'
    },
];
