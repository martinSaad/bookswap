import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-nosearch',
  templateUrl: './navbar-nosearch.component.html',
  styleUrls: ['./navbar-nosearch.component.css']
})
export class NavbarNosearchComponent implements OnInit {

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
