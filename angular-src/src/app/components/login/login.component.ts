import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ValidateService} from "../../services/validate.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;
  error: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private validateService: ValidateService) {}

  ngOnInit() {}

  onLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success){
        this.authService.storeUserDate(data.token, data.user);
        this.error = false;
        this.router.navigate(['']);
      }
      else{
        this.error = true;
      }
    }, err => {
      if (err._body){
        this.error = true;
        let response = JSON.stringify(err._body);
        console.log("error login in: " + response);
      }
      else{
        console.log("error login in: " + JSON.stringify(err));
      }
    })
  }
}
