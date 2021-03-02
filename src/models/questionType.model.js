const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const questionTypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
    default: 'Active', // set to 'Inactive' to soft delete
  },
  values: {
    type: {}, // mixed value
    required: true,
  },
  units: {
    type: String,
  },
});

// add plugin that converts mongoose to json
questionTypeSchema.plugin(toJSON);
questionTypeSchema.plugin(paginate);

/**
 * @typedef QuestionType
 */
const QuestionType = mongoose.model('QuestionType', questionTypeSchema);

module.exports = QuestionType;
