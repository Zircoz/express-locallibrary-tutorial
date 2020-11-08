var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {type: String, required: true, min: 3, max: 100},
    email: {type: String, required:true},
    password: {type: String, required: true},
    currentChallenge: {type: String, required: false}
});

// Export model.
module.exports = mongoose.model('User', UserSchema);
