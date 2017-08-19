const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

router.put('/register', function (req, res, next) {
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    console.log("Trying to save the following user: "+JSON.stringify(newUser));

    if(newUser.firstName && newUser.lastName && newUser.email && newUser.password) {
        User.addUser(newUser, function (err, user) {
            if (err) {
                /**
                 * Only 2 cases since we know that all required parameters are initialized.
                 * 1. Email is not unique -> we will return beautifull message (this approach recommended by Mongoose creator Aaron Heckmann: http://nraj.tumblr.com/post/38706353543/handling-uniqueness-validation-in-mongomongoose)
                 * 2. Problem when creating the solt/hash/other problem that the user should not be aware
                 */
                console.log("Fail to save the following user: "+JSON.stringify(newUser));
                console.log(err);
                let msg = "Could not save the user.";
                if(isUniqueValidationErr(err)){
                    msg = "This e-mail is already taken, please register with other e-mail."
                }
                res.status(400).json({success: false, message: msg});
            }
            else res.status(201).json({success: true, message: 'User created'});
        });
    }
    else res.status(400).json({success: false, message: 'Please fill all mandatory parameters'});

    let isUniqueValidationErr = function(mongooseErr){
        return (mongooseErr && mongooseErr.code && (11000 === mongooseErr.code || 11001 === mongooseErr.code) )
    }

});


router.post('/authenticate', function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password){
        return res.status(400).json({success: false, msg: 'User not found'});
    }

    User.getUserByEmail(email, function (err, user) {
        if (err){
            console.log(err);
            res.status(400).json({success: false, msg: 'Could not find user'});
        } else if (!user){
            res.status(400).json({success: false, msg: 'User not found'});
        } else{
            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err){
                    console.log(err);
                    res.status(400).json({success: false, msg: 'Email or password are wrong'});
                } else if (isMatch){
                    let token = jwt.sign(user, config.secret, {
                        expiresIn: "360d" //360 days
                    });
                    res.status(200).json({
                        success: true,
                        token: 'JWT ' + token,
                        user: {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email
                        }
                    })
                }
                else{
                    return res.status(400).json({success: false, msg: 'Email or password are wrong'});
                }
            })
        }
    })
});

router.get('/profile', passport.authenticate('jwt', {session:false}), function (req, res, next) {
    return res.status(200).json(req.user);
});

module.exports = router;