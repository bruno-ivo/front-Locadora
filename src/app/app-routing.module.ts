import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  LoginFormComponent,
  ResetPasswordFormComponent,
  CreateAccountFormComponent,
  ChangePasswordFormComponent,
} from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import {
  DxDataGridModule,
  DxFormModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { CidadeEstadoComponentComponent } from './shared/components/cidade-estado-component/cidade-estado-component.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import {CidadeEstadoPageComponent} from "./pages/cidade-estado-page/cidade-estado-page.component";
import { LocadoraPageComponent } from './pages/locadora-page/locadora-page.component';
import { ClientePageComponent } from './pages/cliente-page/cliente-page.component';
import { FilmePageComponent } from './pages/filme-page/filme-page.component';
import { PedidoPageComponent } from './pages/pedido-page/pedido-page.component';

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'cidade-estado',
    component: CidadeEstadoPageComponent
  },
  {
    path: 'locadora',
    component: LocadoraPageComponent
  },
  {
    path: 'cliente',
    component: ClientePageComponent
  },
  {
    path: 'filme',
    component: FilmePageComponent
  },
  {
    path: 'pedido',
    component: PedidoPageComponent
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    DxDataGridModule,
    DxFormModule,
    DxButtonModule,
    DxSelectBoxModule,
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, ProfileComponent, TasksComponent],
})
export class AppRoutingModule {}
