const express = require('express');
const router = express.Router();

const { jwtValidation, hasAvalidRole, fieldValidation } = require('../middlewares');
const { getGhibliData } = require('../controllers/index');
const { USER_ROLES } = require('../constants/constants');

/**
 * @method GET
 * @route /api/gibli/data
 * @description consumes a gibli API resource according to role
 * @access Private
 */
router.get('/data', [
    jwtValidation,
    hasAvalidRole(...Object.values(USER_ROLES)),
    fieldValidation
], getGhibliData);

module.exports = router;
