var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/catalog');
});
router.get('/user', function(req,res, next) {
  res.render('user');
});
router.post('/register', userController.register_POST);
router.post('/login', userController.login_POST);
router.get('/logout', userController.logout_GET);


module.exports = router;
