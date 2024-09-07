const user = require('./user');
const auth = require('./auth/auth');
const gibli = require('./ghibli');

module.exports = {
    ...user,
    ...auth,
    ...gibli
}