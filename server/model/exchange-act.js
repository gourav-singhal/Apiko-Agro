const mongoose = require('mongoose');
const { Schema } = mongoose;
const { insert } = require('./methods');

const ExchangeAct = new Schema({
  firstAreaId: {
    type: String,
    required: [true],
  },
  secondAreaId: {
    type: String,
    required: [true],
  },
  firstRenterId: {
    type: String,
    required: [true],
  },
  secondRenterId: {
    type: String,
    required: [true],
  },
  expiration: {
    type: Number,
    required: [true],
  },
  dateOfExchange: {
    type: Date,
    required: [true],
  },
  organizationId: {
    type: String,
    required: [true],
  },
});

ExchangeAct.methods.insert = insert(ExchangeAct);
module.exports = mongoose.model('exchange-act', ExchangeAct);
