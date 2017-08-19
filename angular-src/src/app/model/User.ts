/**
 * Created by martinsaad on 01/05/2017.
 */
export interface User {
  _id?: string;
  username: string;
  email: string;
  name: string;
  books: [{
    _id?: string;
    name: string;
    author: string;
    genre: string;
    location: string;
    condition: string;
  }]
}
