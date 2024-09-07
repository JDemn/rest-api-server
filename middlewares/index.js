const middlewares = require('./fieldValidation');
const jwtValidation = require('./jwtValidation');
const rolesValidation = require('./rolesValidation');
const logRequestDetails = require('./logRequestDetails');
const errorMiddleware = require('./errorMiddleware');

module.exports = {
    ...middlewares,
    ...jwtValidation,
    ...rolesValidation,
    ...logRequestDetails,
    ...errorMiddleware
}