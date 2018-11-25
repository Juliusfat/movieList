import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { User } from '../models/User';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  lastName : String;

  constructor( private authService : AuthentificationService, private router : Router) {}

  ngOnInit() {

    this.authService.currentUser.subscribe(
      (user:User) => {
        if(user) {
        this.lastName = user.lastName;
        console.log(this.lastName);
        } else {
          this.lastName ="";
        }
      }
    )
  }


  logout() {
    this.authService.logout().then(()=>{
      this.router.navigate(['/login']);
    }

    );
  }

}
