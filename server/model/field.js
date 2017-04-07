const mongoose = require('mongoose');

const { Schema } = mongoose;

const Field = new Schema({
  name: {
    type: String,
    required: [true],
  },
  organizationId: {
    type: String,
    required: [true],
  },
  localityId: {
    type: String,
    required: [true],
  },
  square: {
    type: Number,
    required: [true],
  },
  polygonIds: {
    type: Array,
  },
  coordinates: [{
    _id: false,
    lat: {
      type: Number,
      required: [true],
    },
    lng: {
      type: Number,
      required: [true],
    },
  }],
  color: {
    type: String,
  },
});

module.exports = mongoose.model('Field', Field);
