import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import * as jQuery from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public books: any;
  public empty: boolean;


  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getAllBooks().subscribe(result => {
      this.books = result.books;
    });
  }

  search(bookTitle){
    if (bookTitle === ""){ //get all books if user searches for nothing
      this.ngOnInit();
      this.empty = false;
    }
    else{
      this.authService.searchBook(bookTitle).subscribe(result => {
        this.books = result.books;
        this.empty = !result.success;
      });
    }
  }
}
