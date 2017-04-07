const mongoose = require('mongoose');
const { Schema } = mongoose;
const { insert } = require('./methods');

const Area = new Schema({
  type: {
    type: String,
    required: [true],
  },
  actNumber: {
    type: Array,
    required: [true],
  },
  status: {
    type: String,
    required: [true],
  },
  comment: {
    type: String,
  },
  polygonId: {
    type: String,
    required: [true],
  },
  localityId: {
    type: String,
    required: [true],
  },
  renterId: {
    type: String,
    required: [true],
  },
  organizationId: {
    type: String,
    required: [true],
  },
  landlordIds: {
    type: Array,
    required: [true],
  },
  fieldId: {
    type: String,
  },
  fileIds: {
    type: Array,
  },
  contractId: {
    type: String,
  },
});
Area.methods.insert = insert(Area);
module.exports = mongoose.model('Areas', Area);
