const mongoose = require('mongoose');

const { Schema } = mongoose;

const Polygon = new Schema({
  cadastralNumber: {
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
  coordinates: [{
    lat: {
      type: Number,
      required: [true],
    },
    lng: {
      type: Number,
      required: [true],
    },
  }],
});

module.exports = mongoose.model('Polygon', Polygon);
