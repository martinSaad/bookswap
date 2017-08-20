const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
const helper = require('sendgrid').mail;
const util = require('util');

module.exports.sendEmail = function(emailFrom, nameFrom, emailTo, nameTo, message, bookTitle, callback){
    let from_email = new helper.Email(emailFrom);
    let to_email = new helper.Email(emailTo);
    // let to_email = new helper.Email('martin.saad.ms@gmail.com');

    let subject = util.format('The book %s', bookTitle);
    let content = new helper.Content('text/plain', message);
    let mail = new helper.Mail(from_email, subject, to_email, content);


    let request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });

    sg.API(request, callback);
};