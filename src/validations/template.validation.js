const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTemplate = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    status: Joi.string().valid('Active', 'Inactive'),
    questions: Joi.array().items(Joi.custom(objectId)),
  }),
};

const getTemplates = {
  query: Joi.object().keys({
    name: Joi.string(),
    status: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTemplate = {
  params: Joi.object().keys({
    templateId: Joi.string().custom(objectId),
  }),
};

const updateTemplate = {
  params: Joi.object().keys({
    templateId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      status: Joi.string().valid('Active', 'Inactive'),
    })
    .min(1),
};

const deleteTemplate = {
  params: Joi.object().keys({
    templateId: Joi.string().custom(objectId),
  }),
  query: Joi.object().keys({
    hardDelete: Joi.boolean().truthy('true').falsy('false', '').sensitive(),
  }),
};

module.exports = {
  createTemplate,
  getTemplates,
  getTemplate,
  updateTemplate,
  deleteTemplate,
};
