/**
 * HTTP Request validators for entities
 * generate a new validator with joi for each endpoint in the API
 * @see https://joi.dev/
 */
module.exports.authValidation = require('./auth.validation');
module.exports.userValidation = require('./user.validation');
module.exports.teamValidation = require('./team.validation');
