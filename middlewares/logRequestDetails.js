const { response, request } = require('express');
const { logger } = require('../helpers');

/**
 * Logs the details of incoming requests.
 * @middleware
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - Passes control to the next middleware.
 */

const logRequestDetails = (req = request, res = response, next) => {
    logger.info(`[${req?.method}] ${req?.originalUrl} - Operación exitosa`);
    next();
};

module.exports = {
    logRequestDetails
}