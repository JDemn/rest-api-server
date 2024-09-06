const { Router } = require('express');
const { check , param } = require('express-validator');

const { 
    createUser,
    getUsers , 
    getUserById, 
    updateUser , 
    deleteUser
} = require('../controllers/index');
const { 
    fieldValidation,
    fieldsEmpy
} = require('../middlewares/index');
const { hasAvalidRole, toUpperCaseRole } = require('../middlewares/rolesValidation');
const { USER_ROLES } = require('../constants/constants');
const { jwtValidation } = require('../middlewares/jwtValidation');

const router = Router();

/**
 * @method POST
 * @route /api/user/create
 * @description Create a new user in the system
 * @access Public
 */
router.post('/create', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('surnames','Los apelldidos son obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('password','La contraseña debe de ser mayor a 8 carecteres').isLength({min:8}),
    check('password','La contraseña debe incluir como minimo 1 letra mayúscula, una minúscula, y un caracter especial como : % / & @  ').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[%\/&@])[a-zA-Z0-9%\/&@]{8,}$/),     
    check('role','El rol es obligatorio').not().isEmpty(),
    toUpperCaseRole,
    fieldValidation
],createUser );


/**
 * @method GET
 * @route /api/user/all
 * @description Get all user filtering by limit and from param
 * @access Private
 */
router.get('/all', [
    jwtValidation,
    hasAvalidRole(...Object.values(USER_ROLES))
],getUsers );

/**
 * @method GET
 * @route /api/user/:id
 * @description Get an user by Id
 * @access Private
 */
router.get('/:id', [
    jwtValidation,
    param('id').isMongoId().withMessage('No es un ID válido'),
    fieldValidation,
    hasAvalidRole(...Object.values(USER_ROLES))
], getUserById );

/**
 * @method UPDATE
 * @route /api/user/update/:id
 * @description Update an user by Id
 * @access Private
 */
router.put('/update/:id', [
    jwtValidation,
    param('id').isMongoId().withMessage('No es un ID válido'),
    fieldValidation,
    fieldsEmpy,
    hasAvalidRole(...Object.values(USER_ROLES))
],updateUser );

/**
 * @method DELETE
 * @route /api/user/delete/:id
 * @description Delete an user by Id
 * @access Private
 */
router.delete('/delete/:id', [
    jwtValidation,
    param('id').isMongoId().withMessage('No es un ID válido'),
    fieldValidation,    
    hasAvalidRole(...Object.values(USER_ROLES))
] ,deleteUser );

module.exports = router;