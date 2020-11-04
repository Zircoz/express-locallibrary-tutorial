var User = require('../models/user')
var async = require('async')
const bcrypt = require('bcrypt')

const { body,validationResult } = require("express-validator")
exports.register_POST = [

  //validate and sanitize fields
  body('username').trim().isLength({min: 1}).escape().withMessage('Username must be specified')
    .isAlphanumeric().withMessage('Username has non-alphanumeric characters.'),
  body('email').trim().isLength({min: 3}).escape().withMessage('Email must be specified'),
  body('password').trim().isLength({min: 8}).escape().withMessage("Password must be of 8+ length"),

  (req, res, next) => {
    const errors = validationResult(req);
    var hash = bcrypt.hashSync(req.body.password, 10);
    var user = new User(
      {
        name: req.body.username,
        email: req.body.email,
        password: hash
      }
    );
    //console.log(errors.throw());
    if (!errors.isEmpty()) {
      res.send(errors);
    }
    else {
      User.countDocuments({ email: req.body.email}, function(err, doc){
        if (err) {
          res.send("sanitize err");
        }
        else {
          if(doc) {
            res.redirect('/user');
          }
          else {
            user.save(function(err) {
              if (err) { return next(err); }
                res.cookie("userData", {name: user.name, email: user.email, id: user._id, authenticated: true}, {maxAge: 360000});
                res.send(user);
            });
          }
        }
      });
    }
  }
];

exports.login_POST = [
  body('email').trim().isLength({min: 3}).escape().withMessage('Email must be specified'),
  body('password').trim().isLength({min: 8}).escape().withMessage("Password must be of 8+ length"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send("sanitize error")
    }
    else {
      User.findOne({email: req.body.email}, function(err, docs){
        if (err) {
          res.send(err);
        }
        else{
          if(!!docs){
            if(bcrypt.compareSync(req.body.password, docs.password)) {
              res.cookie("userData", {name: docs.name, email: docs.email, id: docs._id, authenticated: true}, {maxAge: 360000});
              res.send(docs);
            }
            else {
              res.render('/user');
            }
          }
        }
      });
    }
  }
];

exports.logout_GET = function (req, res, next) {
    res.clearCookie("userData");
    res.redirect('/user');
};
