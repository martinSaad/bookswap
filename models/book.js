const mongoose = require('mongoose');
mongoose.Promise = Promise;
const BookSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        tags: { type: [String], index: true }
    },
    authors: [{
        type: String
    }],
    description: {
        type: String
    },
    publishDate: {
        type: String
    },
    isbn10: {
        type: String,
        min: 10, max:10
    },
    isbn13: {
        type: String,
        min: 13, max: 13
    },
    categories: [{
        type: String
    }],
    imageLink: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    }
});

const Book = module.exports = mongoose.model('Book', BookSchema);

module.exports.getAllBooks = function (callback) {
    Book.find({}, 'title imageLink country city', callback);
};

module.exports.addBook = function (name, email, book, callback) {
    book['email'] = email;
    book['name'] = name;
    book.save(callback);
};

module.exports.searchBookByTitle = function (title, callback) {
    Book.find({title: {$regex: title, $options: 'i'}}, 'title imageLink', callback);
};

module.exports.getBookById = function (bookId, callback) {
    Book.find({_id: bookId}, callback);
};

module.exports.getAllMyBooks = function (email, callback) {
  Book.find({email: email}, callback);
};

module.exports.deleteBook = function (bookId, callback) {
  Book.findByIdAndRemove(bookId, callback);
};