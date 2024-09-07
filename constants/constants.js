const GHIBLI_URL = "https://ghibliapi.vercel.app"
const API_ROUTES = {
    USERS: '/api/user',
    AUTH : '/api/auth',
    GIBLI_RESOURCES : '/api/gibli'
};

const USER_ROLES = {
    ADMIN : 'ADMIN',
    FILMS : 'FILMS',
    PEOPLE : 'PEOPLE',
    LOCATIONS : 'LOCATIONS',
    SPECIES : 'SPECIES',
    VEHICLES : 'VEHICLES'
};

const ERROR_MESSAGES = {
    NOT_FOUND: 'No se encontró el recurso',
    UNAUTHORIZED: 'No cuenta con los permisos necesarios para acceder a los recursos',
    SERVER_ERROR: 'Error en el sistema, comuniquese con el administrador',
    NOT_VALID_ROLE : 'No se está pasando un rol válido'
};

const GHIBLI_API_ROUTES = {
    FILMS: `${ GHIBLI_URL }/films`,
    PEOPLE: `${ GHIBLI_URL }/people`,
    LOCATIONS: `${ GHIBLI_URL }/locations`,
    SPECIES: `${ GHIBLI_URL }/species`,
    VEHICLES: `${ GHIBLI_URL }/vehicles`,
    ADMIN: `${ GHIBLI_URL }/films`,
};

module.exports = {
    API_ROUTES,
    USER_ROLES,
    ERROR_MESSAGES,
    GHIBLI_API_ROUTES
};
