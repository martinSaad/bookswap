const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
const helper = require('sendgrid').mail;
const util = require('util');

module.exports.sendEmail = function(emailFrom, nameFrom, emailTo, nameTo, bookTitle, callback){
    // let from_email = new helper.Email(emailFrom);
    // let to_email = new helper.Email(emailTo);
    // // let to_email = new helper.Email('martin.saad.ms@gmail.com');
    //
    // let subject = util.format('The book %s', bookTitle);
    // let content = new helper.Content('text/plain', message);
    // let mail = new helper.Mail(from_email, subject, to_email, content);
    //
    //
    // let request = sg.emptyRequest({
    //     method: 'POST',
    //     path: '/v3/mail/send',
    //     body: mail.toJSON(),
    // });

    let request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: {
            "personalizations": [
                {
                    "to": [
                        {
                            "email": emailTo,
                            "name": nameTo
                        }
                    ],
                    "subject": 'New book request'
                }
            ],
            "from": {
                "email": 'noreply@bookswap.com',
                "name": 'Bookswap'
            },
            "reply_to": {
                "email": emailFrom,
                "name": nameFrom
            },
            "subject": "Hello, World!",
            "content": [
                {
                    "type": "text/html",
                    "value":  util.format("<html><p>Hi %s, <br><br> %s is interested in your book <b>%s.</b><br>If you would like to swap it, just click reply to this mail.<br><br>With love (for books),<br>Bookswap team :)</p></html>", nameTo, nameFrom, bookTitle)
                }
            ]
        }
    });

    sg.API(request, callback);
};