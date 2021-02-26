const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { templateService } = require('../services');

const createTemplate = catchAsync(async (req, res) => {
  const template = await templateService.createTemplate(req.body);
  res.status(httpStatus.CREATED).send(template);
});

const getTemplates = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await templateService.queryTemplates(filter, options);
  res.send(result);
});

const getTemplate = catchAsync(async (req, res) => {
  const template = await templateService.getTemplateById(req.params.templateId);
  if (!template) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Template not found');
  }
  res.send(template);
});

const updateTemplate = catchAsync(async (req, res) => {
  const template = await templateService.updateTemplateById(req.params.templateId, req.body);
  res.send(template);
});

const deleteTemplate = catchAsync(async (req, res) => {
  const { hardDelete } = pick(req.query, ['hardDelete']);
  await templateService.deleteTemplateById(req.params.templateId, hardDelete);
  res.status(httpStatus.NO_CONTENT).send();
});

// TODO add questions to template

module.exports = {
  createTemplate,
  getTemplates,
  getTemplate,
  updateTemplate,
  deleteTemplate,
};
