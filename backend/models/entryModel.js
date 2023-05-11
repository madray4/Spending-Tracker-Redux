const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const entrySchema = new Schema({
  store: {
    type: String,
    required: true
  },
  item: {
    type: String,
    required: true
  },
  totalCost: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Entry', entrySchema)