import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/User';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  addForm : FormGroup;
  user : User = new User();
  err : string;

  constructor( private formBuid : FormBuilder, private authService : AuthentificationService, private router : Router) { }

  ngOnInit() {
    this.addForm = this.formBuid.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['',[Validators.required, Validators.minLength(6)]],
      firstName : ['', Validators.required],
      lastName : ['', Validators.required]
    });

  }

  onCreate(){
    if (this.addForm.valid){
      let { email, password, firstName, lastName} = this.addForm.value;
      this.user.email = email;
      this.user.password = password;
      this.user.firstName = firstName; 
      this.user.lastName = lastName;
      this.authService.register(this.user).subscribe(
        ()=>{
          this.router.navigate(['/login']);
        },
        (error)=>{
          this.err = error
        }
      );
    }
  }

}
