const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const teamValidation = require('../../validations/user.validation');
const teamController = require('../../controllers/team.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageTeams'), validate(teamValidation.createTeam), teamController.createTeam)
  .get(auth('getTeams'), validate(teamValidation.getTeams), teamController.getTeams);

router
  .route('/:teamId')
  .get(auth('getTeams'), validate(teamValidation.getTeam), teamController.getTeam)
  .patch(auth('manageTeams'), validate(teamValidation.updateTeam), teamController.updateTeam)
  .delete(auth('manageTeams'), validate(teamValidation.deleteTeam), teamController.deleteTeam);

router
  .route('/:teamId/users')
  .post(auth('manageTeams'), validate(teamValidation.addUserToTeam), teamController.addUserToTeam)
  .delete(auth('manageTeams'), validate(teamValidation.deleteUserFromTeam), teamController.deleteUserFromTeam);

module.exports = router;

// TODO add swagger docs about teams
