const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Campaign = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  desc: {
    type: String,
    default: ''
  },
  donator: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  raise: {
    type: Number,
    default: 0
  },
  goal: {
    type: Number,
    required: true
  },
  startAt: {
    type: Date,
    required: true
  },
  endAt: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Campaign', Campaign)