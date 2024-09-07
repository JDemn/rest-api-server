const { response, request } = require('express');
const { logger } = require('../helpers');

const logRequestDetails = (req = request, res = response, next) => {
    logger.info(`[${req?.method}] ${req?.originalUrl} - Operación exitosa`);
    next();
};
module.exports = {
    logRequestDetails
}