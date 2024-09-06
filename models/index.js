const authModel = require('./auth');
const userModel = require('./user');

module.exports = {
    ...authModel,
    ...userModel
}