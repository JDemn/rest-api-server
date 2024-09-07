const createJWT = require('./createJWT');
const logger = require('./logger');

module.exports = {
    ...createJWT,
    ...logger 
}