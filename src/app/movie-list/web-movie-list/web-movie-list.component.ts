import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from 'src/app/models/Movie.model';
import { Subscription } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-web-movie-list',
  templateUrl: './web-movie-list.component.html',
  styleUrls: ['./web-movie-list.component.scss']
})
export class WebMovieListComponent implements OnInit, OnDestroy {

  movies : Movie[];
  moviesSubscription : Subscription;
  searchTitle : string;

  constructor(private moviesService : MoviesService , private router : Router, private route : ActivatedRoute ) { }

  ngOnInit() {
    this.moviesSubscription = this.moviesService.moviesSubject.subscribe(
      (movies : Movie[]) => {
        this.movies = movies;
        console.log(this.movies);
      }
    );

    this.route.queryParams
      .subscribe(params => {
        if (params.title){
        this.searchTitle = params.title;
        this.moviesService.getWebMovies(this.searchTitle);
        this.moviesService.emitMovie();
        }});
        


  }

  onSubmit(form : NgForm){
    this.searchTitle = form.value['title'];
 
    this.moviesService.getWebMovies(this.searchTitle);
    this.moviesService.emitMovie();
  }

  viewMovie(id : string) {
    console.log("id : " + id);
    this.router.navigate(['/movies','view', id],{ queryParams: { title: this.searchTitle }});
  }

  ngOnDestroy(){
    this.moviesSubscription.unsubscribe();
  }
}
