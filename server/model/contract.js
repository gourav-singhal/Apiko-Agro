const mongoose = require('mongoose');
const { Schema } = mongoose;
const { insert } = require('./methods');

const Contract = new Schema({
  polygonId: {
    type: String,
    required: [true],
  },
  extract: {
    type: String,
    required: [true],
  },
  registrationNumber: {
    type: String,
    required: [true],
  },
  registrationDate: {
    type: Date,
    required: [true],
  },
  validity: {
    type: Number,
    required: [true],
    min: 1,
    max: 100,
  },
  signatureDate: {
    type: Date,
    required: [true],
  },
  areaId: {
    type: String,
  },
  landlordId: {
    type: String,
  },
  renterId: {
    type: String,
  },
  organizationId: {
    type: String,
  },
  fileIds: {
    type: Array,
  },
});

Contract.methods.insert = insert(Contract);
module.exports = mongoose.model('Contract', Contract);
