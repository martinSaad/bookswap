import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {FlashMessagesService} from 'angular2-flash-messages'
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  password: String;
  email: String;

  constructor(private validateService: ValidateService,
              private flushMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    //required fields
    if (!this.validateService.validateRegister(user)){
      this.flushMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout:3000});
      return false;
    }

    if (!this.validateService.validateEmail(user.email)){
      this.flushMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout:3000});
      return false;
    }

    //Register user
    this.authService.registerUser(user).subscribe(data => {
        if (data.success){
          this.flushMessage.show('You are now registered', {cssClass: 'alert-success', timeout:3000});
          this.router.navigate(['/login'])
        }
        else{
          this.flushMessage.show('Something went worng', {cssClass: 'alert-danger', timeout:3000});
          this.router.navigate(['/register'])
        }
      }
    );
  }

}
