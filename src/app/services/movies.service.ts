import { Injectable } from '@angular/core';
import { Movie } from '../models/Movie.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { SingleMovie } from '../models/SingleMovie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  movies: Movie[] = [];
  singleMovie : SingleMovie;
  moviesSubject = new Subject<Movie[]>();
  movieSubject = new Subject<SingleMovie>();

  constructor( private httpClient : HttpClient) { }

  emitMovie() {
    this.moviesSubject.next(this.movies);
  }

  emitSingleMovie(){
    this.movieSubject.next(this.singleMovie);
  }

  saveMovies() {
    firebase.database().ref('/movies').set(this.movies);
  }

  getMovies() {
    firebase.database().ref('/movies')
      .on('value', (data) => {
        this.movies = data.val() ? this.movies = data.val() : [];
      }
      );
  }

  getWebMovies(title: string) {
    this.httpClient.get<Movie[]>('http://www.omdbapi.com/?s='+title+'&apikey=bdc8d183')
        .subscribe(
            (reponse) =>{
                this.movies = reponse['Search'];
                this.emitMovie();
            },
            (error) =>{
                console.log('erreur de chargement: ' + error );
            }
        );
  }

  getSingleMovie(id : string) {
    this.httpClient.get<SingleMovie>('http://www.omdbapi.com/?i='+id+'&apikey=bdc8d183')
    .subscribe(
        (reponse) =>{
            this.singleMovie= reponse;
            this.emitSingleMovie();
        },
        (error) =>{
            console.log('erreur de chargement: ' + error );
        }
    );
  }

  createNewMovie(newMovie : Movie) {
    this.movies.push(newMovie);
    this.saveMovies();
    this.emitMovie();
  }

  removeMovie(movie : Movie) {
    if(movie.poster) {
      const storageRef = firebase.storage().refFromURL(movie.poster);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const movieIndexToRemove = this.movies.findIndex(
      (movieEl) => {
        if(movieEl === movie) {
          return true;
        }
      }
    );
    this.movies.splice(movieIndexToRemove, 1);
    this.saveMovies();
    this.emitMovie();
    }

    uploadFile(file: File) {
      return new Promise(
        (resolve, reject) => {
          const almostUniqueFileName = Date.now().toString();
          const upload = firebase.storage().ref()
            .child('images/' + almostUniqueFileName + file.name).put(file);
          upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () => {
              console.log('Chargement…');
            },
            (error) => {
              console.log('Erreur de chargement ! : ' + error);
              reject();
            },
            () => {
              resolve(upload.snapshot.ref.getDownloadURL());
            }
          );
        }
      );
  }
}
