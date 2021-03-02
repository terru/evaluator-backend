const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const questionValidation = require('../../validations/question.validation');
const questionController = require('../../controllers/question.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageQuestions'), validate(questionValidation.createQuestion), questionController.createQuestion)
  .get(auth('getQuestions'), validate(questionValidation.getQuestions), questionController.getQuestions);

router
  .route('/:questionId')
  .get(auth('getQuestions'), validate(questionValidation.getQuestion), questionController.getQuestion)
  .patch(auth('manageQuestions'), validate(questionValidation.updateQuestion), questionController.updateQuestion)
  .delete(auth('manageQuestions'), validate(questionValidation.deleteQuestion), questionController.deleteQuestion);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Question management and retrieval
 */

/**
 * @swagger
 * path:
 *  /questions:
 *    post:
 *      summary: Create a question
 *      description: Only admins can create questions.
 *      tags: [Questions]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - questionType
 *                - question
 *              properties:
 *                question:
 *                  type: string
 *                questionType:
 *                  type: ObjectId
 *                  description: must be a valid mongo id
 *                status:
 *                  type: string
 *                  description: Active is default
 *                comments:
 *                   type: boolean
 *                optional:
 *                   type: boolean
 *              example:
 *                question: "How was your day?"
 *                questionType: 5ebac534954b54139806d444
 *                optional: true
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Question'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all questions
 *      description: Only admins can retrieve all questions.
 *      tags: [Questions]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: question
 *          schema:
 *            type: string
 *          description: question
 *        - in: query
 *          name: questionType
 *          schema:
 *            type: string
 *          description: Question type
 *        - in: query
 *          name: questionType
 *          schema:
 *            type: string
 *          description: Question type object Id
 *        - in: query
 *          name: status
 *          schema:
 *            type: string
 *          description: Active or Inactive
 *        - in: query
 *          name: optional
 *          schema:
 *            type: boolean
 *          description: optional
 *        - in: query
 *          name: comments
 *          schema:
 *            type: boolean
 *          description: Question type
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: sort by query in the form of field:desc/asc (ex. name:asc)
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of questions
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Question'
 *                  page:
 *                    type: integer
 *                    example: 1
 *                  limit:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * path:
 *  /questions/{id}:
 *    get:
 *      summary: Get a question
 *      description: Only admins can fetch questions for now.
 *      tags: [Questions]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Question id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Question'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a question
 *      description:  Only admins can update questions for now.
 *      tags: [Questions]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Question id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                question:
 *                  type: string
 *                questionType:
 *                  type: ObjectId
 *                  description: must be a valid mongo id
 *                status:
 *                  type: string
 *                  description: Active is default
 *                comments:
 *                   type: boolean
 *                optional:
 *                   type: boolean
 *              example:
 *                question: "How was your day?"
 *                optional: false
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Question'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a question
 *      description: Only admins can delete questions.
 *      tags: [Questions]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Question id
 *      responses:
 *        "200":
 *          description: No content
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
