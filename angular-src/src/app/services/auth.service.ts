import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import "rxjs/add/operator/map";
import {tokenNotExpired} from "angular2-jwt";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthService {

  authToken: any;
  user: any;
  api = environment.apiUrl;


  constructor(private http: Http) {}

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.api+'/users/register', user, {headers: headers}).map(res => res.json());
  }

  addBook(book){
    this.loadToken();
    let request = {
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      book: book
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http.post(this.api+'/books/book', request, {headers: headers}).map(res => res.json());
  }

  sendEmail(to, message, bookTitle, nameTo){
    this.loadToken();
    let request = {
      user: this.user,
      emailTo: to,
      nameTo: nameTo,
      message: message,
      bookTitle: bookTitle
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    console.log("user, " + JSON.stringify(this.user));
    console.log("sending email from auth");
    return this.http.post(this.api+'/books/email', request, {headers: headers}).map(res => res.json());
  }

  getAllBooks(){
    this.loadToken();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http.get(this.api+'/books/books', {headers: headers}).map(res => res.json());
  }

  searchBook(title){
    this.loadToken();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', this.authToken);

    let params = new URLSearchParams();
    params.set('title', title);

    let requestOptions = new RequestOptions();
    requestOptions.params = params;
    requestOptions.headers = headers;

    return this.http.get(this.api+'/books/search', requestOptions).map(res => res.json());
  }

  getBookById(bookId){
    this.loadToken();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', this.authToken);

    let params = new URLSearchParams();
    params.set('id', bookId);

    let requestOptions = new RequestOptions();
    requestOptions.params = params;
    requestOptions.headers = headers;

    return this.http.get(this.api+'/books/bookId', requestOptions).map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.api+'/users/authenticate', user, {headers: headers}).map(res => res.json());
  }

  getMyBooks(){
    this.loadToken();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http.get(this.api+'/books/mybooks', {headers: headers}).map(res => res.json());
  }

  deleteBook(bookId){
    this.loadToken();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    let params = new URLSearchParams();
    params.set('bookId', bookId);

    let requestOptions = new RequestOptions();
    requestOptions.params = params;
    requestOptions.headers = headers;
    return this.http.delete(this.api+'/books/books', requestOptions).map(res => res.json());
  }

  storeUserDate(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadToken(){
    let token = localStorage.getItem('id_token');
    let user = localStorage.getItem('user');
    this.authToken = token;
    this.user = user;
  }

  loggedIn(){
    return tokenNotExpired();
  }
}
