import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from 'src/app/models/Movie.model';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SingleMovie } from 'src/app/models/SingleMovie.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit, OnDestroy {

  movie : SingleMovie;
  movieSubscription : Subscription;

  constructor( private movieService : MoviesService,
                private route : ActivatedRoute,
                private router : Router) { }

  ngOnInit() {
    this.movieSubscription = this.movieService.movieSubject.subscribe(
      (movie : SingleMovie) => {
        this.movie = movie;
        console.log(this.movie);
      }
    );
    const id = this.route.snapshot.params['id'];
    this.movieService.getSingleMovie(id);
  }

  onBack(){
    this.router.navigate(['/webmovies']);
  }

  ngOnDestroy(): void {
    this.movieSubscription.unsubscribe();
    
  }
}
