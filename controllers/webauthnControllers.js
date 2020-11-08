var User = require('../models/user');
var Authenticator = require('../models/authenticator');

var {generateAttestationOptions, verifyAttestationResponse} = require('@simplewebauthn/server');

// Human-readable title for your website
const rpName = 'Test Library';

//For localhost
/*
// A unique identifier for your website
const rpID = 'localhost';
// The URL at which attestations and assertions should occur
const origin = 'https://localhost';
*/

//For Heroku app
// A unique identifier for your website
const rpID = 'test-lib-webnauth.herokuapp.com';
// The URL at which attestations and assertions should occur
const origin = 'https://test-lib-webnauth.herokuapp.com';

exports.generateAttestationOptions_GET = async function(req, res, next) {
  const user = await User.findOne({email: req.cookies.userData.email});
  const userAuthenticators = await Authenticator.find({user_id: user._id});
  const options = generateAttestationOptions({
    rpName,
    rpID,
    userID: user.id,
    userName: user.name,
    // Don't prompt users for additional information about the authenticator
    // (Recommended for smoother UX)
    attestationType: 'indirect',
    // Prevent users from re-registering existing authenticators
    excludeCredentials: userAuthenticators.map(userAuthenticator => ({
      id: userAuthenticator.credentialID,
      type: 'public-key',
      // Optional
      //transports: dev.transports,
    })),
  });
  User.findByIdAndUpdate(user._id, {currentChallenge: options.challenge},
    function (err, docs) {
      if (err){
          console.log(err);
      }
      else{
          res.send(options);
      }
  })
};

exports.verifyAttestation_POST = async function(req, res, next) {
  const { body } = req;
  const user = await User.findOne({email: req.cookies.userData.email});
  const expectedChallenge = user.currentChallenge;

  let verification;
  try {
    verification = await verifyAttestationResponse({
      credential: body,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: error.message });
  }
  const { verified, authenticatorInfo } = verification;
  if (!!verified) {
    const { base64PublicKey, base64CredentialID, counter } = authenticatorInfo;
    var newAuthenticator = new Authenticator(
      {
        credentialID: base64PublicKey,
        publicKey: base64PublicKey,
        counter: counter,
        user_id: user._id
      }
    );
    newAuthenticator.save(function(err,result){
      if (err){
          console.log(err);
      }
      else{
        res.send({ verified });
      }
    });
  } else {
    res.send(verified);
  }
}
