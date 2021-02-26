const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const templateValidation = require('../../validations/template.validation');
const templateController = require('../../controllers/template.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageForms'), validate(templateValidation.createTeam), templateController.createTemplate)
  .get(auth('getForms'), validate(templateValidation.getTeams), templateController.getTemplates);

router
  .route('/:templateId')
  .get(auth('getForms'), validate(templateValidation.getTeam), templateController.getTemplate)
  .patch(auth('manageForms'), validate(templateValidation.updateTeam), templateController.updateTemplate)
  .delete(auth('manageForms'), validate(templateValidation.deleteTeam), templateController.deleteTemplate);

// TODO questions should be /:templateId/questions
module.exports = router;

// TODO add swagger docs
