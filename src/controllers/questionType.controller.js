const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { questionTypeService } = require('../services');

const createQuestionType = catchAsync(async (req, res) => {
  const questionType = await questionTypeService.createQuestionType(req.body);
  res.status(httpStatus.CREATED).send(questionType);
});

const getQuestionTypes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'values', 'status', 'units']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await questionTypeService.queryQuestionTypes(filter, options);
  res.send(result);
});

const getQuestionType = catchAsync(async (req, res) => {
  const questionType = await questionTypeService.getQuestionTypeById(req.params.questionTypeId);
  if (!questionType) {
    throw new ApiError(httpStatus.NOT_FOUND, 'QuestionType not found');
  }
  res.send(questionType);
});

const updateQuestionType = catchAsync(async (req, res) => {
  const questionType = await questionTypeService.updateQuestionTypeById(req.params.questionTypeId, req.body);
  res.send(questionType);
});

const deleteQuestionType = catchAsync(async (req, res) => {
  await questionTypeService.deleteQuestionTypeById(req.params.questionTypeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createQuestionType,
  getQuestionTypes,
  getQuestionType,
  updateQuestionType,
  deleteQuestionType,
};
