import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthChildGuard } from "./guards/AuthChild/auth-child.guard";
import { AuthGuardGuard } from "./guards/AuthGuard/auth-guard.guard";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
    canActivate: [AuthGuardGuard],canActivateChild:[AuthChildGuard]
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./auth/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "sign-up",
    loadChildren: () =>
      import("./auth/sign-up/sign-up.module").then((m) => m.SignUpPageModule),
  },
  {
    path: "forgot-password",
    loadChildren: () =>
      import("./auth/forgot-password/forgot-password.module").then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'chating/:uuid',
    loadChildren: () => import('./home/chating/chating.module').then( m => m.ChatingPageModule)
  },
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [AuthGuardGuard,AuthChildGuard],
})
export class AppRoutingModule {}
