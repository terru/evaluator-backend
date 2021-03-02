const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createQuestion = {
  body: Joi.object().keys({
    question: Joi.string().required(),
    questionType: Joi.string().required().custom(objectId),
    status: Joi.string().valid('Active', 'Inactive'),
    comments: Joi.boolean().truthy('true').falsy('false', '').sensitive(),
    optional: Joi.boolean().truthy('true').falsy('false', '').sensitive(),
  }),
};

const getQuestions = {
  query: Joi.object().keys({
    question: Joi.string(),
    questionType: Joi.string().custom(objectId),
    status: Joi.string(),
    optional: Joi.boolean().truthy('true').falsy('false', '').sensitive(),
    comments: Joi.boolean().truthy('true').falsy('false', '').sensitive(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getQuestion = {
  params: Joi.object().keys({
    questionId: Joi.string().custom(objectId),
  }),
};

const updateQuestion = {
  params: Joi.object().keys({
    questionId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      question: Joi.string(),
      questionType: Joi.string().custom(objectId),
      status: Joi.string(),
      optional: Joi.boolean().truthy('true').falsy('false', '').sensitive(),
      comments: Joi.boolean().truthy('true').falsy('false', '').sensitive(),
    })
    .min(1),
};

const deleteQuestion = {
  params: Joi.object().keys({
    questionId: Joi.string().custom(objectId),
  }),
  query: Joi.object().keys({
    hardDelete: Joi.boolean().truthy('true').falsy('false', '').sensitive(),
  }),
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
