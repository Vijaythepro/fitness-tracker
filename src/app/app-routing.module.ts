import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingComponent } from './training/training.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGaurd } from './auth/auth-guard';

const routes: Routes = [
    { path: '', component: WelcomeComponent}
    //lazy loading
    //     { path: 'training', loadChildren: () => import('./training/training.module').then(m =>{
    //     m.TrainingModule
    // })},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}