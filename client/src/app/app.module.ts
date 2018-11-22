import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// Angular modules
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { JsonpModule } from '@angular/http';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// Auth components
import {
  AuthenticationService,
  AuthGuardService,
  LoginComponent,
  ProfileComponent,
  RegisterComponent
} from './auth';

// Post components
import {
  PostCreateComponent,
  PostListComponent
} from './posts';

// Reddit components
import {
  RedditListComponent
} from './reddit';

// Pipes and extra modules
import { MaterialModule } from './shared/material.module';
import { DatePipe } from './shared/pipes/date.pipe';

// Import all of our routes to pass to the router
import { routes } from './app.routes';
import { TimeFromNowPipe } from './time-from-now.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    RegisterComponent,
    PostCreateComponent,
    PostListComponent,
    RedditListComponent,
    DatePipe,
    TimeFromNowPipe,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    JsonpModule,
    MaterialModule,
  ],
  providers: [
    AuthenticationService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
