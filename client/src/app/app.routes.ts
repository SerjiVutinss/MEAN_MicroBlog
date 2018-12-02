import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import {
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AuthGuardService
} from "./auth";
import {
    PostListComponent
} from "./posts";
import { RedditListComponent } from "./reddit";
import { CommentListComponent } from "./comments";
import { PostsCommentsComponent } from "./posts-comments/posts-comments.component";

export const routes: Routes = [

    // default route
    { path: '', component: HomeComponent },

    // auth routes
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },

    // post routes
    { path: 'post/list', component: PostListComponent },
    // { path: 'post/create', component: PostCreateComponent },
    // { path: 'post/edit/:id', component: PostCreateComponent },

    // comment routes
    { path: 'comment/list', component: CommentListComponent },
    // { path: 'comment/create', component: CommentCreateComponent },
    // { path: 'comment/edit/:id', component: CommentCreateComponent },
    { path: 'post/:id/comments', component: PostsCommentsComponent },

    // reddit routes
    { path: 'reddit-list', component: RedditListComponent }
];