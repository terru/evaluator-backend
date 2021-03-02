const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const QuestionTypeValidation = require('../../validations/questionType.validation');
const QuestionTypeController = require('../../controllers/questionType.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('manageQuestions'),
    validate(QuestionTypeValidation.createQuestionType),
    QuestionTypeController.createQuestionType
  )
  .get(auth('getQuestions'), validate(QuestionTypeValidation.getQuestionTypes), QuestionTypeController.getQuestionTypes);

router
  .route('/:questionTypeId')
  .get(auth('getQuestions'), validate(QuestionTypeValidation.getQuestionType), QuestionTypeController.getQuestionType)
  .patch(
    auth('manageQuestions'),
    validate(QuestionTypeValidation.updateQuestionType),
    QuestionTypeController.updateQuestionType
  )
  .delete(
    auth('manageQuestions'),
    validate(QuestionTypeValidation.deleteQuestionType),
    QuestionTypeController.deleteQuestionType
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: QuestionTypes
 *   description: QuestionTypes management and retrieval
 */

/**
 * @swagger
 * path:
 *  /questionTypes:
 *    post:
 *      summary: Create a QuestionType
 *      description: Only admins can create QuestionTypes.
 *      tags: [QuestionTypes]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *              properties:
 *                name:
 *                  type: string
 *                values:
 *                  type: Mixed
 *                  description: could have the HTML to render the type of question
 *                status:
 *                  type: string
 *                  description: Active is default
 *                units:
 *                   type: string
 *              example:
 *                name: "TextInput"
 *                values: "<input type='text'/>"
 *                units: "chars"
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/QuestionType'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all the QuestionTypes
 *      description: Only admins can retrieve all QuestionTypes.
 *      tags: [QuestionTypes]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: QuestionType
 *          schema:
 *            type: string
 *          description: QuestionType
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *          description: QuestionType name
 *        - in: query
 *          name: values
 *          schema:
 *            type: Mixed
 *          description: A value for the question type
 *        - in: query
 *          name: status
 *          schema:
 *            type: string
 *          description: Active or Inactive
 *        - in: query
 *          name: units
 *          schema:
 *            type: string
 *          description: optional
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
 *          description: Maximum number of QuestionTypes
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
 *                      $ref: '#/components/schemas/QuestionType'
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
 *  /questionTypes/{id}:
 *    get:
 *      summary: Get a QuestionType
 *      description: Only admins can fetch QuestionTypes for now.
 *      tags: [QuestionTypes]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: QuestionType id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/QuestionType'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a QuestionType
 *      description:  Only admins can update QuestionTypes for now.
 *      tags: [QuestionTypes]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: QuestionType id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                values:
 *                  type: Mixed
 *                  description: could have the HTML to render the type of question
 *                status:
 *                  type: string
 *                  description: Active is default
 *                units:
 *                   type: string
 *              example:
 *                name: "Ratio"
 *                units: "mts"
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/QuestionType'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a QuestionType
 *      description: Only admins can delete QuestionTypes.
 *      tags: [QuestionTypes]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: QuestionType id
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
