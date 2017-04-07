const _ = require('lodash');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const Organization = new Schema({
  name: {
    type: String,
    required: [true],
    unique: true,
  },
  ownerId: {
    type: String,
    required: [true],
    // todo: uncoment here when auth will be finished;
    //unique: true,
  },
  localities: [{
    _id: false,
    id: {
      type: String,
    },
    color: {
      type: String,
    },
  }],
});
const PUBLIC_FIELDS = ['_id', 'name', 'localities'];

Organization.methods.publicOnly = function publicOnly() {
  return _.pick(this, PUBLIC_FIELDS);
};


module.exports = mongoose.model('Organization', Organization);
