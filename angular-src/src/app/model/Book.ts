/**
 * Created by martinsaad on 05/05/2017.
 */
export class Book{
  _id: string;
  title: string;
  authors: string[];
  description: string;
  publishDate: string;
  isbn10: number;
  isbn13: number;
  categories: string[];
  imageLink: string;
  language: string;
  country: string;
  city: string;

  constructor(_id, title, authors, description, publishDate, isbn10, isbn13, categories, imageLink, language
  , country, city){
    this._id = _id;
    this.title = title;
    this.authors = authors;
    this.description = description;
    this.publishDate = publishDate;
    this.isbn10 = isbn10;
    this.isbn13 = isbn13;
    this.categories = categories;
    this.imageLink = imageLink;
    this.language = language;
    this.country = country;
    this.city = city;
  }
}
