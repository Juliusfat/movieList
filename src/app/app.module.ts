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
import { AuthGuardService } from './guards/auth-guard.service';
import { MoviesService } from './services/movies.service';
import { Routes, RouterModule } from '@angular/router';
import { WebMovieListComponent } from './movie-list/web-movie-list/web-movie-list.component';
import { SortPipe } from './pipes/sort.pipe';
import { LoginComponent } from './login/login.component';
import { AuthentificationService } from './services/authentification.service';
import { RegisterComponent } from './register/register.component';

const appRoutes : Routes = [
  { path : 'login', component : LoginComponent },
  { path : 'register', component : RegisterComponent },
  { path : 'webmovies', canActivate : [AuthGuardService] ,component : WebMovieListComponent },
  { path : 'movies/new/:id', canActivate : [AuthGuardService] ,component : MovieFormComponent },
  { path : 'movies/view/:id', canActivate : [AuthGuardService] ,component : SingleMovieComponent },
  { path : 'movies', canActivate : [AuthGuardService] ,component : MovieListComponent },
  { path : '', redirectTo: 'webmovies', pathMatch : 'full'},
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
    LoginComponent,
    SortPipe,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuardService, MoviesService, AuthentificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
