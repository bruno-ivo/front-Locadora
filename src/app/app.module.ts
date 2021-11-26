import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { CidadeEstadoComponentModule } from './shared/components/cidade-estado-component/cidade-estado-component.component';
import { CidadeEstadoPageComponent } from './pages/cidade-estado-page/cidade-estado-page.component';
import { CidadeEstadoService } from './shared/services/cidade-estado.service';
import { HttpClientModule } from '@angular/common/http';
import { LocadoraPageComponent } from './pages/locadora-page/locadora-page.component';
import { ClientePageComponent, ClientePageComponentModule } from './pages/cliente-page/cliente-page.component';
import { FilmePageComponent } from './pages/filme-page/filme-page.component';
import { PedidoPageComponent } from './pages/pedido-page/pedido-page.component';
import { ClienteService } from './shared/services/cliente.service';
import { ClienteComponentModule } from './shared/components/cliente/cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    CidadeEstadoPageComponent,
    LocadoraPageComponent,
    ClientePageComponent,
    FilmePageComponent,
    PedidoPageComponent,

  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    CidadeEstadoComponentModule,
    ClienteComponentModule,
    HttpClientModule
  ],
  providers: [AuthService, ScreenService, AppInfoService, CidadeEstadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
