const _ = require('lodash');
const httpStatus = require('http-status');
const { Team, User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a team
 * @param {Object} teamBody
 * @returns {Promise<Team>}
 */
const createTeam = async (teamBody) => {
  const manager = await User.findById(teamBody.manager);
  if (!manager) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Manager does not exist');
  }
  const team = await Team.create(teamBody);
  return team;
};

/**
 * Query for teams
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTeams = async (filter, options) => {
  const teams = await Team.paginate(filter, options);
  return teams;
};

/**
 * Get team by id
 * @param {ObjectId} id
 * @returns {Promise<Team>}
 */
const getTeamById = async (id) => {
  return Team.findById(id);
};

/**
 * Update team by id
 * @param {ObjectId} teamId
 * @param {Object} updateBody
 * @returns {Promise<Team>}
 */
const updateTeamById = async (teamId, updateBody) => {
  const team = await getTeamById(teamId);
  if (!team) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
  }
  if (updateBody.manager && !(await User.getUserById(updateBody.manager))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Manager does not exist');
  }
  Object.assign(team, updateBody);
  await team.save();
  return team;
};

/**
 * Delete Team by id
 * @param {ObjectId} teamId
 * @param {Boolean} hardDelete
 * @returns {Promise<User>}
 */
const deleteTeamById = async (teamId, hardDelete = false) => {
  const team = await getTeamById(teamId);
  if (!team) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
  }
  // remove if its hardDelete
  if (hardDelete) {
    await team.remove();
    return team;
  }
  // allow soft delete
  team.status = 'Invalid';
  await team.save();
  return team;
};

/*
USERS MANAGEMENT
*/

/**
 * Add an user to a team by id
 * @param {ObjectId} teamId
 * @param {ObjectId} userId
 * @returns {Promise<Team>}
 */
const addUserToTeam = async (teamId, userId) => {
  const user = await User.getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const team = await getTeamById(teamId);
  if (!team) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
  }
  const hasUser =
    _.findIndex(team.users, (teamUser) => {
      return teamUser._id === user._id;
    }) === -1;
  if (hasUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exist in the team');
  }
  team.users.add(user);
  await team.save();
  return team;
};

/**
 *  Remove an user from a team by id
 * @param {*} teamId
 * @param {*} userId
 */
const removeUserFromTeam = async (teamId, userId) => {
  const user = await User.getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const team = await getTeamById(teamId);
  if (!team) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
  }
  const userIndex = _.findIndex(team.users, (teamUser) => {
    return teamUser._id === user._id;
  });
  if (userIndex === -1) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist in the team');
  }
  team.users.splice(userIndex, 1);
  await team.save();
  return team;
};

module.exports = {
  createTeam,
  queryTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
  addUserToTeam,
  removeUserFromTeam,
};
