import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
   path:'',
   loadChildren: () => import('./pages/pre-auth/pre-auth.module').then(m => m.PreAuthModule)
  },
  {
    path:'dashboard',
    loadChildren: () => import('./pages/post-auth/post-auth.module').then(m => m.PostAuthModule),
    canActivate:[AuthGuard]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
