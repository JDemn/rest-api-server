const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { fieldValidation } = require('../middlewares/index');
const { auth } = require('../controllers/index');

/**
 * @route POST /api/auth/login
 * @description Authenticate a user with email and password
 * @access Public
 */

router.post('/login',[
    check('email','El valor ingresado no tiene el aspecto de un correo').isEmail(),
    check('email','El correo es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    fieldValidation
],auth);


module.exports = router;