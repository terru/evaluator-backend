const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  questionType: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'QuestionType',
    required: true,
  },
  comments: {
    type: Boolean,
    default: false,
  },
  optional: {
    type: Boolean,
    default: false,
  },
});

// add plugin that converts mongoose to json
questionSchema.plugin(toJSON);
questionSchema.plugin(paginate);

/**
 * @typedef Question
 */
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
