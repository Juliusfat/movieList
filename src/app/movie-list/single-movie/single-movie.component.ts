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
  searchTitle : string;
  movie : SingleMovie;
  movieSubscription : Subscription;
  id : string;

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
    this.id = this.route.snapshot.params['id'];
    this.movieService.getSingleMovie(this.id);
    this.route.queryParams
      .subscribe(params => {
        this.searchTitle = params.title;
        });
  }

  onBack(): void{
    this.router.navigate(['/webmovies'],{ queryParams: { title: this.searchTitle }});
  }

  ngOnDestroy(): void {
    this.movieSubscription.unsubscribe();
  }

  onMyMovie() : void{
    this.router.navigate(['/movies','new',this.id]);
  }
}
