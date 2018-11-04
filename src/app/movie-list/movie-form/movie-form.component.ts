import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MoviesService } from 'src/app/services/movies.service';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/Movie.model';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {

  movieForm : FormGroup;
  fileIsUploading = false;
  fileUrl : string;
  fileUpLoaded = false;

  constructor( private movieService : MoviesService,
                private router : Router,
                private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.movieForm = this.formBuilder.group({
      title : ['', Validators.required],
      author : ['', Validators.required]
    });
  }

  onSaveMovie() {
    const title = this.movieForm.get('title').value;
    const author = this.movieForm.get('author').value;
    const newMovie = new Movie(title, author);
    if (this.fileUrl && this.fileUrl !== ''){
      newMovie.poster = this.fileUrl;
    }
    this.movieService.createNewMovie(newMovie);
    this.router.navigate(['/movies']);
  }

  onUploadFile(file : File) {
    this.fileIsUploading = true;
    this.movieService.uploadFile(file).then(
      (url : string) =>{
        console.log(url);
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUpLoaded = true;
      }
    )
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

}
