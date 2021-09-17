import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up-sign-in/sign-up-sign-in.component';

const routes: Routes = [
    {
        path:'',
        component:SignUpComponent
    },
    {
        path:'verify-email',
        loadChildren: () => import('./verify-email/verify-email.module').then(m => m.VerifyEmailModule)
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreAuthRoutingModule { }
