const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], [
  'getUsers',
  'manageUsers',
  'getTeams',
  'manageTeams',
  'getForms',
  'manageForms',
  'getQuestions',
  'manageQuestions',
]);

module.exports = {
  roles,
  roleRights,
};
