import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        LoginComponent,
        SignUpComponent
    ],
    imports: [
        MaterialModule,
        CommonModule,
        FormsModule,
        AuthRoutingModule
    ]
})

export class AuthModule { }