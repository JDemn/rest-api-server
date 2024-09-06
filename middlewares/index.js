const middlewares = require('./fieldValidation');
const jwtValidation = require('./jwtValidation');
const rolesValidation = require('./rolesValidation');

module.exports = {
    ...middlewares,
    ...jwtValidation,
    ...rolesValidation
}