let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema   = new Schema({
  screen_name : {
    type: String,
    required: true
  },
  profileUrl: {
    type: String
  },
  handle_name: {
    type: String,
    required: true,
    unique: true
  },
  uuid: {
    type: String,
    required: true,
    unique: true
  },
  created: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
