const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const teamValidation = require('../../validations/team.validation');
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

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Team management and retrieval, users can be added/removed to a team from here too
 */

/**
 * @swagger
 * path:
 *  /teams:
 *    post:
 *      summary: Create a team
 *      description: A team requires a Manager and a name to be created, only Admins can create a team.
 *      tags: [Teams]
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
 *                - manager
 *              properties:
 *                name:
 *                  type: string
 *                manager:
 *                  type: ObjectId
 *                  description: must be a valid mongo id
 *              example:
 *                name: The greatest team
 *                manager: fakeMongoId111
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Team'
 *        "400":
 *          $ref: '#/components/responses/ManagerNoExist'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all teams
 *      description: Only admins can retrieve all teams.
 *      tags: [Teams]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *          description: Team name
 *        - in: query
 *          name: manager
 *          schema:
 *            type: string
 *          description: Team manager
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
 *          description: Maximum number of teams
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
 *                      $ref: '#/components/schemas/Team'
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
 *  /teams/{id}:
 *    get:
 *      summary: Get a team
 *      description: Only admin can fetch teams for now.
 *      tags: [Teams]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Team id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Team'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a team
 *      description: Only admins can update teams for now.
 *      tags: [Teams]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Team id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                manager:
 *                  type: string
 *                  description: must be a valid user id
 *              example:
 *                name: "updated team"
 *                manager: aNewManagerId
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Team'
 *        "400":
 *          $ref: '#/components/responses/ManagerNoExist'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a team
 *      description: Only admins can delete teams for now.
 *      tags: [Teams]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Team id
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

/**
 * @swagger
 * path:
 *  /teams/{id}/users:
 *    post:
 *      summary: Add an user to a team
 *      description: Only Admins can add users to a team for now.
 *      tags: [Teams,Users]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Team id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - user
 *              properties:
 *                user:
 *                  type: string
 *                  description: user should be a valid user id
 *              example:
 *                user: 5ebac534954b54139806c111
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Team'
 *        "400":
 *          $ref: '#/components/responses/UserAlreadyExist'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    delete:
 *      summary: Delete an user from a Team
 *      description: Only admins can remove users from a team for now.
 *      tags: [Teams,Users]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Team id
 *        - in: query
 *          name: hardDelete
 *          schema:
 *            type: string
 *          description: enable hard delete
 *      responses:
 *        "200":
 *          description: No content
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 * */
