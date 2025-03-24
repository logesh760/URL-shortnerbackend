const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortid: {
    type: String,
    required: true, // corrected from 'request' to 'required'
    unique: true
  },
  redirectURL: {
    type: String,
    required: true // corrected from 'request' to 'required'
  },
  History: [
    {
      timestamp: { type: Number, required: true } // you can also use Date if you prefer
    }
  ],
  createBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true // assuming you want to enforce this
  }
});

// Create model
const model = mongoose.model('url', urlSchema);

module.exports = model;
