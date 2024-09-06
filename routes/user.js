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
    fieldValidation
} = require('../middlewares/index');
const { hasAvalidRole } = require('../middlewares/rolesValidation');
const { USER_ROLES } = require('../constants/constants');

const router = Router();

router.post('/create', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('surnames','Los apelldidos son obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    check('role','El rol es obligatorio').not().isEmpty(),
    fieldValidation
],createUser );

router.get('/all', getUsers );

router.get('/:id', [
    param('id').isMongoId().withMessage('No es un ID válido'),
    fieldValidation
], getUserById );

router.put('/update/:id', [
    param('id').isMongoId().withMessage('No es un ID válido'),
    fieldValidation,
],updateUser );

router.delete('/delete/:id', [
    param('id').isMongoId().withMessage('No es un ID válido'),
    fieldValidation
] ,deleteUser );

module.exports = router;