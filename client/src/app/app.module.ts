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
  RegisterComponent,
  UserListComponent
} from './auth';

// Post components
import {
  PostCreateComponent,
  PostListComponent,
  PostCreateDialogComponent,
  PostEditDialogComponent,
  PostUserListComponent
} from './posts';

// Comment components
import {
  CommentCreateComponent,
  CommentListComponent,
  CommentCreateDialogComponent,
  CommentEditDialogComponent,
  CommentUserListComponent
} from './comments';


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
import { DeleteDialogComponent } from './shared/delete-dialog/delete-dialog.component';


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
    UserListComponent,
    PostCreateDialogComponent,
    PostEditDialogComponent,
    PostUserListComponent,
    CommentCreateComponent,
    CommentCreateDialogComponent,
    CommentListComponent,
    CommentEditDialogComponent

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
  bootstrap: [AppComponent],
  entryComponents: [
    DeleteDialogComponent,
    PostCreateDialogComponent,
    PostEditDialogComponent,
    CommentCreateDialogComponent
  ]
})
export class AppModule { }
