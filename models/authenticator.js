var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthenticatorSchema = new Schema(
  {
    credentialID: {type: String},
    publicKey: {type: String},
    counter: {type: Number},
//  transports: {type: },
    user_id: {type: Schema.Types.ObjectId}
  }
);

// Export model.
module.exports = mongoose.model('Authenticator', AuthenticatorSchema);
