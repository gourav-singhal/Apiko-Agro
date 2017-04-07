const mongoose = require('mongoose');

const { Schema } = mongoose;

const Renter = new Schema({
  name: {
    type: String,
    required: [true],
  },
  isParticipiant: {
    type: Boolean,
    required: [true],
  },
  organizationId: {
    type: String,
    required: [true],
  },
});

module.exports = mongoose.model('Renter', Renter);
