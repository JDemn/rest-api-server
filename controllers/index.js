const user = require('./user');
const auth = require('./auth/auth');

module.exports = {
    ...user,
    ...auth
}