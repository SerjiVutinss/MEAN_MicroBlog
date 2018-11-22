import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import {
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AuthGuardService
} from "./auth";
import {
    PostListComponent,
    PostCreateComponent
} from "./posts";
import { RedditListComponent } from "./reddit";

export const routes: Routes = [
    
    // default route
    { path: '', component: HomeComponent },

    // auth routes
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },

    // post routes
    { path: 'post/list', component: PostListComponent },
    { path: 'post/create', component: PostCreateComponent },
    { path: 'post/edit/:id', component: PostCreateComponent },

    // reddit routes
    { path: 'reddit-list', component: RedditListComponent }
];