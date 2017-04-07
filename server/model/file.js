const mongoose = require('mongoose');
const { Schema } = mongoose;
const { insert, insertAll } = require('./methods');

const File = new Schema({
  url: {
    type: String,
    required: [true],
  },
  name: {
    type: String,
    required: [true],
  },
  organizationId: {
    type: String,
    required: [true],
  },
});


File.methods.insert = insert(File);
File.methods.insertAll = insertAll(File);
module.exports = mongoose.model('File', File);
