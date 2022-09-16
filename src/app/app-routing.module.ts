import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/Guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';




const routes: Routes = [
  {path:'',redirectTo:'signIn',pathMatch:'full'},
  {path:'signUp',component:SignUpComponent},
  {path:'signIn',component:SignInComponent},
  {path:'profile',canActivate:[AuthGuard],component:ProfileComponent},
  {path:'**',component:NotFoundComponent},

  


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
