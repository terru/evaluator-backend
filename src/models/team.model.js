const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const teamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    manager: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isMongoId(value)) {
          throw new Error('Invalid id for manager');
        }
      },
    },
    users: {
      type: [
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'User',
          required: true,
        },
      ],
    },
    status: {
      type: String,
      required: true,
      trim: true,
      default: 'Active', // set to 'Inactive' to soft delete
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
teamSchema.plugin(toJSON);
teamSchema.plugin(paginate);

/**
 * @typedef Team
 */
const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
