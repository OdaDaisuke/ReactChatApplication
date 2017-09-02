let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ChatSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true
  },
  created: {
    type: Number,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  from_id: {
    type: String,
    required: true
  },
  send_to: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Chat', ChatSchema);
