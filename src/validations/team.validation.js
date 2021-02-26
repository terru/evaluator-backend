const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTeam = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    manager: Joi.string().required().custom(objectId),
    status: Joi.string().valid('Active', 'Inactive'),
    users: Joi.array().items(Joi.custom(objectId)),
  }),
};

const getTeams = {
  query: Joi.object().keys({
    name: Joi.string(),
    manager: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTeam = {
  params: Joi.object().keys({
    teamId: Joi.string().custom(objectId),
  }),
};

const updateTeam = {
  params: Joi.object().keys({
    teamId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      manager: Joi.string().custom(objectId),
      status: Joi.string().valid('Active', 'Inactive'),
    })
    .min(1),
};

const deleteTeam = {
  params: Joi.object().keys({
    teamId: Joi.string().custom(objectId),
  }),
  query: Joi.object().keys({
    hardDelete: Joi.boolean().truthy('true').falsy('false', '').sensitive(),
  }),
};

const addUserToTeam = {
  params: Joi.object().keys({
    teamId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    user: Joi.string().required().custom(objectId),
  }),
};

const deleteUserFromTeam = {
  params: Joi.object().keys({
    teamId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    user: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
  addUserToTeam,
  deleteUserFromTeam,
};
