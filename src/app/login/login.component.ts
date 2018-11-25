import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { User } from '../models/User';
import { AuthentificationService } from '../services/authentification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user : User = new User();
  loginForm : FormGroup;
  error : string;
  stateUrl : string;


  constructor(private formBuider : FormBuilder, private auth : AuthentificationService, private route : ActivatedRoute, private router : Router ) { }

  ngOnInit() {
    this.loginForm = this.formBuider.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]]
    });
    this.stateUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(){
    if (this.loginForm.valid) {
      let { email, password } = this.loginForm.value;
      this.user.email =  email;
      this.user.password = password;
      console.log(this.user);
      this.auth.login(this.user).then(()=>{
        this.router.navigate([this.stateUrl]);
      }).catch(err=>{
        this.error=err;
      })
    }
  }

}
