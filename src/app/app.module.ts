import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { from } from 'rxjs';
import {AuthService} from './auth.service'
import {AuthGuard} from './auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    NavbarComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
       {
        path:'login',
        component:LoginComponent,
      },
      {
        path:'admin',
        component: AdminComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'finish',
        component:HomeComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'newuser',
        component:UserComponent,
        canActivate:[AuthGuard],
      },
      {
        path:'',
        component:HomeComponent
      },
     
      

    ]),
    NoopAnimationsModule,
  ],
  providers: [AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
