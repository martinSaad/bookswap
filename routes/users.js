const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../config/database')
const User = require('../models/user')

router.post('/register', function (req, res, next) {
    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    User.addUser(newUser, function (err, user) {
        if (err)
            res.status(400).json({success: false, message: err})
        else
            res.status(201).json({success: true, message: 'user created'})

    })
})

router.post('/authenticate', function (req, res, next) {
    var username = req.body.username
    var password = req.body.password

    User.getUserByUsername(username, function (err, user) {
        if (err)
            console.log(err)
        if (!user)
            return res.json({success: false, msg: 'user not found'})

        User.comparePassword(password, user.password, function (err, isMatch) {
            if (err)
                console.log(err)
            if (isMatch){
                var token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 //1 week
                })

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            }
            else{
                return res.json({success: false, msg: 'wrong password'})
            }

        })
    })



})

router.get('/profile', passport.authenticate('jwt', {session:false}), function (req, res, next) {
    res.json({user: req.user})
})


module.exports = router