import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './+home/home.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { LoginComponent } from './+login/login.component';
import { SessionGuard } from './_guards/session.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'documentation',
    component: DocumentationComponent,
    loadChildren: () => import('./documentation/documentation.module').then(m => m.DocumentationModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
  providers: [SessionGuard]
})
export class AppRoutingModule {}
