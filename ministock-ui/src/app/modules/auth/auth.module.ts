import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';
import { RouterLink } from '@angular/router';


@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    DynamicFormComponent,
    RouterLink,
    PrimengModule
  ]
})
export class AuthModule { }
