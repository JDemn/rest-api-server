
const API_ROUTES = {
    USERS: '/api/user',
    AUTH : '/api/auth'
};

const USER_ROLES = {
    ADMIN : 'ADMIN',
    FILM : 'FILMS',
    PEOPLE : 'PEOPLE',
    LOCATIONS : 'LOCATIONS',
    SPECIES : 'SPECIES',
    VEHICLES : 'VEHICLES'
};

const ERROR_MESSAGES = {
    NOT_FOUND: 'Resource not found',
    UNAUTHORIZED: 'You are not authorized to access this resource',
    SERVER_ERROR: 'Error en el sistema, comuniquese con el administrador',
    NOT_VALID_ROLE : 'No se está pasando un rol válido'
};

module.exports = {
    API_ROUTES,
    USER_ROLES,
    ERROR_MESSAGES,
};
