import {Component, OnInit} from "@angular/core";
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName: String;
  lastName: String;
  password: String;
  email: String;
  passwordConfirm: String;
  passConfirm: boolean = false;
  error: boolean = false;
  registerForm: any;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){

    if (this.password != this.passwordConfirm){
      this.passConfirm = true;
      this.password = null;
      this.passwordConfirm = null;
      return false;
    }

    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    this.authService.registerUser(user).subscribe(data => {
        if (data.success){
          this.passConfirm = false;
          this.error = false;
          this.router.navigate(['/login'])
        }
        else{
              this.error = true;
        }
      }
    );
  }

}
