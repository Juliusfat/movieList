import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movieshelves';

  constructor() {
    var config = {
      apiKey: "AIzaSyDN3O4Wj7NB27HuMR7t8LSCYl9aAAl6psM",
      authDomain: "mymoviesselect.firebaseapp.com",
      databaseURL: "https://mymoviesselect.firebaseio.com",
      projectId: "mymoviesselect",
      storageBucket: "mymoviesselect.appspot.com",
      messagingSenderId: "1075314386288"
    };
    firebase.initializeApp(config);
  }
}
