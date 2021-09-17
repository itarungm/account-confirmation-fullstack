import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up-sign-in/sign-up-sign-in.component';
import { PreAuthRoutingModule } from './pre-auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    PreAuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ]
})
export class PreAuthModule { }
