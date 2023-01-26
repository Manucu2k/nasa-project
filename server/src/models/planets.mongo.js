const mongoose = require('mongoose');

const planetsSchema = new mongoose.SchemaTypeOptions({
  keplerName: {
    type: String,
    required: true,
  }, 
});

module.exports = mongoose.model('Planet', planetsSchema);