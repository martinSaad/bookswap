const mongoose = require('mongoose');
mongoose.Promise = Promise;
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
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
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByEmail = function (email, callback) {
    var query = {email: email};
    User.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByUsername = function (username, callback) {
    let query = {username: username};
    User.findOne(query, callback);
};

module.exports.getBooksOfUser = function (email, callback) {
    User.find({email: email}, 'books', callback);
};

module.exports.getBooksOfAllUsers = function (callback) {
    User.find({}, 'email books', callback);
};

module.exports.deleteBook = function (userId, bookId, callback) {
    User.findOneAndUpdate({_id: userId}, {$pull: {books: {_id: bookId}}}, {new:true}, callback);
};

module.exports.setBook = function (userId, book, callback) {
    User.findOneAndUpdate({_id: userId}, {$push: {"books": {
        title: book.title,
        location: book.location,
        condition: book.condition,
        description: book.description,
        imageLink: book.imageLink,
        isbn10: book.isbn10,
        isbn13: book.isbn13,
        language: book.language,
        publishDate: book.publishDate,
        authors: book.authors,
        categories: book.categories
    }}}, {new: true}, callback);
};

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err)
            console.log(err);
        else{
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err)
                    console.log(err);
                else{
                    newUser.password = hash;
                    newUser.save(callback);
                }
            })
        }

    })
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err)
            console.log(err);
        else
            callback(null, isMatch);
    })
};