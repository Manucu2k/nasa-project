const mongoose = require('mongoose');

const launchesSchema = new mongoose.SchemaTypeOptions({
  flightNumber: {
    type: Number,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  }, 
  rocket: {
    type: String,
    required: true,
  }, 
  launchDate: {
    type: String,
    required: true,
  }, 
  target: {
    type: String,
  },
  customers: [ String ],
  upcoming: {
    type: Boolean,
    required: true,
  }, 
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model('Launch', launchesSchema);