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

/**
 * @swagger
 * tags:
 *   name: Templates
 *   description: Form templates management and retrieval, questions should be added/removed from here.
 */

/**
 * @swagger
 * path:
 *  /templates:
 *    post:
 *      summary: Create a template
 *      description: A template requires just a name, only Admins can create a form template.
 *      tags: [Templates]
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
 *                status:
 *                  type: string
 *                  description: Active is default
 *                questions:
 *                  type: array
 *                  description: Array of mongo ids with question references
 *              example:
 *                name: Weekly feedback
 *                status: Active
 *                questions: ÑArray of mongo ids
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Template'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all form templates
 *      description: Only admins can retrieve all templates.
 *      tags: [Templates]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *          description: Template name
 *        - in: query
 *          name: status
 *          schema:
 *            type: string
 *          description: Values are "Active" or "Inactive"
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
 *          description: Maximum number of templates
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
 *                      $ref: '#/components/schemas/Template'
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
 *  /templates/{id}:
 *    get:
 *      summary: Get a template
 *      description: Only admins can fetch templates for now.
 *      tags: [Templates]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Template id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Template'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a template
 *      description: Only admins can update templates for now.
 *      tags: [Templates]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: template id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                status:
 *                  type: string
 *                  description: valid status are "Active" and "Inactive"
 *              example:
 *                name: "New form template name"
 *                status: "Inactive"
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Template'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a template
 *      description: Only admins can delete form templates for now.
 *      tags: [Templates]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Template id
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
