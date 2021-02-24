const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// TODO implement teamValidation and add it to the chain of responsibility
// const teamValidation = require('../../validations/user.validation');
const teamController = require('../../controllers/team.controller');

const router = express.Router();

router.route('/').post(auth('manageTeams'), teamController.createTeam).get(auth('getTeams'), teamController.getTeams);

router
  .route('/:teamId')
  .get(auth('getTeams'), teamController.getTeam)
  .patch(auth('manageTeams'), teamController.updateTeam)
  .delete(auth('manageTeams'), teamController.deleteTeam);

router
  .route('/:teamId/users')
  .post(auth('manageTeams'), teamController.addUserToTeam)
  .delete(auth('manageTeams'), teamController.deleteUserFromTeam);

module.exports = router;

// TODO add swagger docs about teams
