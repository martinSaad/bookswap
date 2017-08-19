import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book: any;
  getBookButton: boolean = false;
  message: string;
  emailSent: boolean = false;
  errorSendingMail: boolean = false;
  errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params: Params) => {
      this.authService.getBookById(params.params.id).subscribe(book => {
        this.book = book.book[0];
      });
    });
  }

  getBook(){
    this.getBookButton = true;
  }

  sendEmail(){
    if (this.message != null){
      this.authService.sendEmail(this.book.email, this.message, this.book.title, this.book.firstName).subscribe(result => {
        if (result.success == false){
          this.errorSendingMail = true;
          this.errorMessage = 'There was an error while trying to send email, please try again later';
        }
        else{
          this.errorSendingMail = false;
          this.emailSent = true;
        }
      });
    }
    else{
      this.errorSendingMail = true;
      this.errorMessage = 'Please fill a message before sending';
    }
  }

}
