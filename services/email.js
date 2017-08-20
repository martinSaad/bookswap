/**
 * Created by martinsaad on 01/08/2017.
 */
'use strict';
const nodemailer = require('nodemailer');
const config = require('../config/email');
const util = require('util');


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure, // secure:true for port 465, secure:false for port 587
    auth: {
        user: config.username,
        pass: config.password
    }
});


module.exports.sendEmail = function (emailFrom, nameFrom, emailTo, nameTo, message, bookTitle, callback) {
    let mailOptions = {
        from: emailFrom,
        to: 'martin.saad.ms@gmail.com', // list of receivers
        subject: bookTitle, // Subject line
        text: message, // plain text body
        html: util.format('<p>%s</p>', message) // html body
    };

    transporter.sendMail(mailOptions, callback);
};