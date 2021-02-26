const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const templateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
    default: 'Active', // set to 'Inactive' to soft delete
  },
  questions: {
    type: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Question',
        required: true,
      },
    ],
  },
});

// add plugin that converts mongoose to json
templateSchema.plugin(toJSON);
templateSchema.plugin(paginate);

/**
 * @typedef Template
 */
const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
