const mongoose = require('mongoose');
const { Schema } = mongoose;
const { insert } = require('./methods');


const Landlord = new Schema({
  fullName: {
    type: String,
    required: [true],
  },
  status: {
    type: String,
    required: [true],
  },
  personalId: {
    type: String,
    // required: [true],
    // unique: true,
  },
  address: {
    type: String,
    // required: [true],
  },
  phoneNumber: {
    type: String,
    // required: [true],
  },
  comment: {
    type: String,
  },
  passportDetails: {
    type: String,
    // required: [true],
  },
  organizationId: {
    type: String,
    required: [true],
  },
  fileIds: {
    type: Array,
  },
});
Landlord.methods.insert = insert(Landlord);
module.exports = mongoose.model('Landlord', Landlord);
