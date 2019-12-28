import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertifyService } from './_services/alertify.service';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import {HttpClientModule} from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import {FormsModule} from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInteceptorProvider } from './_services/error.interceptor';


@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),

   ],
   providers: [
      AuthService,
      ErrorInteceptorProvider,
      AlertifyService,
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
