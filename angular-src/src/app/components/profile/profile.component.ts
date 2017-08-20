import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {User} from "../../model/User";
import {GoogleBooksService} from "../../services/google-books.service";
import {Router} from "@angular/router";
import {Book} from "../../model/Book";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  books: Book;
  conditions = ['As new', 'Good', 'Bad'];
  countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];


  //book
  isbn: number;
  country: string;
  city: string;
  condition: string;

  bookNotFound: boolean = false;

  constructor(private authService: AuthService,
              private flushMessage: FlashMessagesService,
              private googleBooksService: GoogleBooksService) { }

  ngOnInit() {
    this.getBooks();
  }

  onAddBookSubmit(){
    let book = {
      title: null,
      authors: null,
      description: null,
      publishDate: null,
      isbn10: null,
      isbn13: null,
      categories: null,
      imageLink: null,
      language: null,
      country: this.country,
      city: this.city,
      condition: this.condition
    };

    this.googleBooksService.getBookInfo(this.isbn).subscribe(result => {
      if (result.totalItems == 0){
        this.bookNotFound = true;
        return false;
      }
      else {
        let items = result.items[0];
        let volumeInfo = items.volumeInfo;
        if (volumeInfo) {
          this.bookNotFound = false;
          book.title = volumeInfo.title;
          book.authors = volumeInfo.authors;
          book.description = volumeInfo.description;
          book.publishDate = volumeInfo.publishedDate;

          //get isbn
          let industryIdentifiers = volumeInfo.industryIdentifiers;
          for (let i = 0; i < industryIdentifiers.length; i++) {
            if (industryIdentifiers[i].type === "ISBN_13") {
              book.isbn13 = industryIdentifiers[i].identifier;
            }
            else if (industryIdentifiers[i].type === "ISBN_10") {
              book.isbn10 = industryIdentifiers[i].identifier;
            }
          }

          book.categories = volumeInfo.categories;
          book.imageLink = volumeInfo.imageLinks.thumbnail;
          book.imageLink = book.imageLink.replace('http', 'https');
          book.language = volumeInfo.language;
        }
      }

      this.authService.addBook(book).subscribe(data => {
        if (data.success) {
          this.flushMessage.show(data.message, {cssClass: 'alert-success', timeout: 3000});
          this.user = data.user;
          this.getBooks();

        }
        else {
          this.flushMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    });
  }

  onDeleteBook(bookId){
    this.authService.deleteBook(bookId).subscribe(result => {
      if (result.success){
        this.getBooks();
      }
      else{
        this.flushMessage.show('Could not delete the book. Try again later', {cssClass: 'alert-danger', timeout:3000});
      }
    });
  }

  getBooks(){
    this.authService.getMyBooks().subscribe(result => {
        this.user = result.user;
        this.books = result.books;
      },
      err => {
        console.log(err);
      });
  }
}
