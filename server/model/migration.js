const mongoose = require('mongoose');

const { Schema } = mongoose;

const Migration = new Schema({
  version: {
    type: Number,
    required: [true],
  },
});

module.exports = mongoose.model('Migration', Migration);
