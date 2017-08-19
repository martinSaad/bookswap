import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Book} from "../model/Book";

@Injectable()
export class GoogleBooksService {

  apiUrl = "https://www.googleapis.com/books/v1/volumes?q=";

  constructor(private http: Http) { }

  getBookInfo(isbn){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = this.apiUrl+"isbn:"+isbn;
    return this.http.get(url, {headers: headers}).map(res => res.json());
  }
}
