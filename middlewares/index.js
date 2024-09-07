const middlewares = require('./fieldValidation');
const jwtValidation = require('./jwtValidation');
const rolesValidation = require('./rolesValidation');
const logRequestDetails = require('./logRequestDetails');

module.exports = {
    ...middlewares,
    ...jwtValidation,
    ...rolesValidation,
    ...logRequestDetails
}