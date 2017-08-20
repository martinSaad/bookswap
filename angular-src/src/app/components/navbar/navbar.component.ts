import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService,
              private router: Router,
              private home: HomeComponent) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }

  search(bookTitle){
    this.home.search(bookTitle);
  }
}
