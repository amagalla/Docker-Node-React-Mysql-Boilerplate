const
    express = require('express'),
    router = express.Router(),
    { registerUser, getUser } = require('../../controller/registeration');

/**
 * @swagger
 * 
 * definitions:
 *      RegisterUser:
 *          type: object
 *          description: User's information
 *          properties:
 *              first_name:
 *                  type: string
 *                  example: John
 *              last_name:
 *                  type: string
 *                  example: Doe
 *              email:
 *                  type: string
 *                  example: email@a1.test
 *              password:
 *                  type: string
 *                  example: abc123
 */

/**
 * @swagger
 * 
 *  /api/profiles/register:
 * 
 *  post:
 *      description: Register a new User
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: User to register
 *            description: The user's information
 *            required: true
 *            schema:
 *              $ref: '#/definitions/RegisterUser'
 *      responses:
 *          200:
 *              description: User registered successfully
 *          400:
 *              description: Registration failed
 */

router.post(
    '/register',
    async (req, res) => {
        
        console.log('Inside register route!!');
        const resp = await registerUser(req.body);

        if (!resp) {
            return res.status(400).send({ success: false });
        };

        res.status(200).send({ success: 'User registered'});
    }
);

/**
 * @swagger
 * 
 *  /api/profiles/login:
 *  
 *  get:
 *      description: Get all registered users
 *      responses:
 *          200:
 *              description: Received all users
 *          400:
 *              description: Failed to get users
 */

router.get(
    '/login',
    async (req, res) => {
        const resp = await getUser();

        return res.status(200).send({ profile: resp });
    }
);

module.exports = router;