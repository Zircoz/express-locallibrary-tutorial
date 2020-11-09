var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
//var SimpleWebAuthnServer = require('@simplewebauthn/server');
var webauthnController = require('../controllers/webauthnControllers');
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
router.get('/profile', userController.isAuthenticated, userController.profile_GET);
router.get('/generate-attestation-options', userController.isAuthenticated, webauthnController.generateAttestationOptions_GET);
router.post('/verify-attestation', userController.isAuthenticated, webauthnController.verifyAttestation_POST);
router.post('/generate-assertion-options', webauthnController.generateAssertionOptions_POST);
router.post('/verify-assertion', webauthnController.verifyAssertion_POST);

module.exports = router;
