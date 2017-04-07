const mongoose = require('mongoose');

const { Schema } = mongoose;

const Localities = new Schema({
  name: {
    type: String,
    required: [true],
  },
  formattedAddress: {
    type: String,
    required: [true],
  },
  coordinates: {
    lat: {
      type: Number,
      required: [true],
    },
    lng: {
      type: Number,
      required: [true],
    },
  },
  placeId: {
    type: String,
    required: [true],
  },
});

module.exports = mongoose.model('Localities', Localities);
