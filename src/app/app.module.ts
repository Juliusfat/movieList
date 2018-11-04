import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SingleMovieComponent } from './movie-list/single-movie/single-movie.component';
import { MovieFormComponent } from './movie-list/movie-form/movie-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { MoviesService } from './services/movies.service';
import { Routes, RouterModule } from '@angular/router';
import { WebMovieListComponent } from './movie-list/web-movie-list/web-movie-list.component';
import { SortPipe } from './pipes/sort.pipe';

const appRoutes : Routes = [
  { path : 'auth/signup', component : SignupComponent },
  { path : 'auth/signin', component : SigninComponent },
  { path : 'webmovies', canActivate : [AuthGuardService] ,component : WebMovieListComponent },
  { path : 'movies/new', canActivate : [AuthGuardService] ,component : MovieFormComponent },
  { path : 'movies/view/:id', canActivate : [AuthGuardService] ,component : SingleMovieComponent },
  { path : 'movies', canActivate : [AuthGuardService] ,component : MovieListComponent },
  { path : '', redirectTo: 'movies', pathMatch : 'full'},
  { path : '**', redirectTo : 'movies'}
] 

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    MovieListComponent,
    SingleMovieComponent,
    MovieFormComponent,
    HeaderComponent,
    WebMovieListComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuardService, MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
