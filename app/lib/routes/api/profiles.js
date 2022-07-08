const
    express = require('express'),
    router = express.Router(),
    { registerUser, getUser } = require('../../controller/registeration');

/**
 * @openapi
 *  
 * components:
 *  schemas:
 *      RegisterUser:
 *          type: object
 *          required:
 *              - first_name
 *              - last_name
 *              - email
 *              - password
 *          properties:
 *              first_name:
 *                  type: string
 *              last_name:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *          example:
 *              first_name: John
 *              last_name: Doe
 *              email: test@testemail.test
 *              password: abc123
 *      RegisterResponse:
 *          type: object
 *          example:
 *              first_name: John
 *              last_name: Doe
 *              email: test@testemail.test
 */

/**
 * @openapi
 * 
 * /api/profiles/register:
 *  post:
 *      summary: Register a new User
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RegisterUser'
 *      reponses:
 *          200:
 *              description: The user was successfully registered
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RegisterResponse'
 */

router.post(
    '/register',
    async (req, res) => {
        
        const resp = await registerUser(req.body);

        if (!resp) {
            return res.status(400).send({ success: false });
        };

        res.status(200).send({ success: 'User registered'});
    }
);

/**
 * @openapi
 * 
 * /api/profiles/login:
 *  get:
 *      summary: Get all registered users
 *      reponses:
 *          200:
 *              description: Received all users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */

router.get(
    '/login',
    async (req, res) => {
        const resp = await getUser();

        return res.status(200).send({ profile: resp });
    }
);

module.exports = router;