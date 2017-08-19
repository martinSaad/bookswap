const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Book = require('../models/book');
const Email = require('../services/email');


router.get('/search', function (req, res, next) {
    Book.searchBookByTitle(req.query.title, function (err, books) {
        if (err)
            return res.status(400).json({success: false, message: err});
        else if (books.length > 0){
            return res.status(200).json({success: true, message: 'success', books:books});
        }else{
            return res.status(200).json({success: false, message: 'No books found'});
        }
    });
});

router.get('/mybooks', passport.authenticate('jwt', {session:false}), function (req, res, next) {
    Book.getAllMyBooks(req.user.email, function (err, books) {
        if (err)
            return res.status(400).json({success: false, message: err});
        else {
            return res.status(200).json({success: true, message: 'success', books:books, user:req.user});
        }
    });
});

router.delete('/books', passport.authenticate('jwt', {session:false}), function (req, res, next) {
    Book.deleteBook(req.query.bookId, function (err, books) {
        if (err)
            return res.status(400).json({success: false, message: err});
        else {
            return res.status(200).json({success: true, message: 'book was deleted'});
        }
    });
});

router.post('/book', passport.authenticate('jwt', {session:false}), function (req, res, next) {
    if (req.user && req.body.book){
        let book = new Book({
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            title: req.body.book.title,
            authors: req.body.book.authors,
            isbn10: req.body.book.isbn10,
            isbn13: req.body.book.isbn13,
            description: req.body.book.description,
            publishDate: req.body.book.publishDate,
            categories: req.body.book.categories,
            imageLink: req.body.book.imageLink,
            country: req.body.book.country,
            city: req.body.book.city,
            condition: req.body.book.condition,
            language: req.body.book.language
        });

        Book.addBook(req.user.name, req.user.email, book, function (err, user) {
            if (err)
                return res.status(400).json({success: false, message: err});
            else{
                return res.status(200).json({success: true, message: 'book was added', user:user});
            }
        });
    } else{
        return res.status(400).json({success: false, message: 'missing mandatory params'});
    }
});

router.get('/books', function (req, res, next) {
    Book.getAllBooks(function (err, books) {
        if (err)
            return res.status(400).json({success: false, message: err});
        else{
            return res.status(200).json({success: true, message: 'success', books:books});
        }
    });
});

router.get('/bookId', function (req, res, next) {
    Book.getBookById(req.query.id, function (err, book) {
        if (err)
            return res.status(400).json({success: false, message: err});
        else if (book){
            return res.status(200).json({success: true, book:book});
        }else{
            return res.status(200).json({success: false, message: 'No book found with id ' + req.query.id});
        }
    });
});

router.post('/email', passport.authenticate('jwt', {session:false}), function (req, res, next) {
    if (req.body){
        let user = JSON.parse(req.body.user);
        let email = {
            emailFrom: user.email,
            nameFrom: user.firstName,
            nameTo: req.body.nameTo,
            emailTo: req.body.emailTo,
            message: req.body.message,
            bookTitle: req.body.bookTitle
        };

        Email.sendEmail(email.emailFrom, email.nameFrom, email.emailTo, email.nameTo, email.message, email.bookTitle, function (err, info) {
            if (err)
                return res.status(400).json({success: false, message: err});
            else{
                return res.status(200).json({success: true, message: info});
            }
        });
    } else{
        return res.status(400).json({success: false, message: 'missing mandatory params'});
    }
});

module.exports = router;