const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createQuestionType = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    status: Joi.string().valid('Active', 'Inactive'),
    values: Joi.object(),
    units: Joi.string(),
  }),
};

const getQuestionTypes = {
  query: Joi.object().keys({
    name: Joi.string(),
    status: Joi.string(),
    units: Joi.string(),
    values: Joi.object(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getQuestionType = {
  params: Joi.object().keys({
    questionTypeId: Joi.string().custom(objectId),
  }),
};

const updateQuestionType = {
  params: Joi.object().keys({
    questionTypeId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      status: Joi.string(),
      units: Joi.string(),
      values: Joi.object(),
    })
    .min(1),
};

const deleteQuestionType = {
  params: Joi.object().keys({
    questionTypeId: Joi.string().custom(objectId),
  }),
  query: Joi.object().keys({
    hardDelete: Joi.boolean().truthy('true').falsy('false', '').sensitive(),
  }),
};

module.exports = {
  createQuestionType,
  getQuestionTypes,
  getQuestionType,
  updateQuestionType,
  deleteQuestionType,
};
