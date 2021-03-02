const httpStatus = require('http-status');
const { QuestionType } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a questionType
 * @param {Object} questionTypeBody
 * @returns {Promise<QuestionType>}
 */
const createQuestionType = async (questionTypeBody) => {
  const questionType = await QuestionType.create(questionTypeBody);
  return questionType;
};

/**
 * Query for questionTypes
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryQuestionTypes = async (filter, options) => {
  const questionTypes = await QuestionType.paginate(filter, options);
  return questionTypes;
};

/**
 * Get questionType by id
 * @param {ObjectId} id
 * @returns {Promise<QuestionType>}
 */
const getQuestionTypeById = async (id) => {
  return QuestionType.findById(id);
};

/**
 * Update QuestionType by id
 * @param {ObjectId} questionTypeId
 * @param {Object} updateBody
 * @returns {Promise<QuestionType>}
 */
const updateQuestionTypeById = async (questionTypeId, updateBody) => {
  const questionType = await getQuestionTypeById(questionTypeId);
  if (!questionType) {
    throw new ApiError(httpStatus.NOT_FOUND, 'QuestionType not found');
  }
  Object.assign(questionType, updateBody);
  // mixed attributes should be marked as updated
  if (updateBody.values) {
    questionType.markModified('values');
  }
  await questionType.save();
  return questionType;
};

/**
 * Delete QuestionType by id
 * @param {ObjectId} questionId
 * @param {Boolean} hardDelete
 * @returns {Promise<QuestionType>}
 */
const deleteQuestionTypeById = async (questionTypeId, hardDelete = false) => {
  const questionType = await getQuestionTypeById(questionTypeId);
  if (!questionType) {
    throw new ApiError(httpStatus.NOT_FOUND, 'QuestionType not found');
  }
  // remove if its hardDelete
  if (hardDelete) {
    await questionType.remove();
    return questionType;
  }
  // allow soft delete
  questionType.status = 'Invalid';
  await questionType.save();
  return questionType;
};

module.exports = {
  createQuestionType,
  queryQuestionTypes,
  getQuestionTypeById,
  updateQuestionTypeById,
  deleteQuestionTypeById,
};
