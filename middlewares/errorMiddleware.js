
const { ERROR_MESSAGES } = require("../constants/constants");
const { logger } = require("../helpers");

/**
 * Middleware for handling errors in the application.
 * 
 * This middleware captures errors occurring in other parts of the application,
 * logs the error along with request details, and sends an appropriate error response
 * to the client.
 * @middleware
 * @param {Error} err - The error object captured. This object should contain a `message` property with the error description and optionally a `status` property with the HTTP status code.
 * @param {Object} req - The Express request object. Includes properties such as `method` and `originalUrl` used for logging request details.
 * @param {Object} res - The Express response object. Used to send the error response to the client.
 * @param {Function} next - The Express `next` function. Not used in this middleware but should be included in the error-handling middleware signature.
 * 
 * @returns {Object} - Returns a JSON response to the client with an error message and, if the request URL is not `/api/user/create`, the error message.
 */
const errorMiddleware = (err, req, res, next) => {
    logger?.error(`[${req?.method}] ${req?.originalUrl} - Error en el controlador: ${err?.message}`);
    
    return res.status(err?.status || 500).json({
        msg: ERROR_MESSAGES?.SERVER_ERROR,
        error: req?.originalUrl !== '/api/user/create' && err?.message
    });
};

module.exports = {
    errorMiddleware
}
