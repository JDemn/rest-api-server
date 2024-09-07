
const axios = require('axios');
const { ERROR_MESSAGES, GHIBLI_API_ROUTES } = require('../constants/constants');

/**
 * @function getGhibliData
 * @description Fetches data from the Studio Ghibli API based on the user's role. The role determines which API endpoint to call. If the role is invalid, returns a 403 error. If an error occurs during the API call, returns a 500 error.
 * @param {Object} req - Express request object containing the user's role.
 * @param {Object} req.user - The user object containing role information.
 * @param {string} req.user.role - The role of the user, which is used to determine the API endpoint.
 * @param {Object} res - Express response object used to send back the API data or error messages.
 * @returns {Object} 200 - Returns the data from the Studio Ghibli API if the request is successful.
 * @returns {Object} 403 - Returns an error message if the user's role is not valid.
 * @returns {Object} 500 - Returns an error message if there is an internal server error while fetching data from the API.
 * 
 * @throws {Error} If there is an issue with the API request or response handling, returns a 500 error response.
 * 
 * @example
 * // Request example (assuming user role is 'films'):
 * GET /api/ghibli
 * 
 * // Successful response
 * {
 *   "data": { ...dataFromApi }
 * }
 * 
 * // Error response for invalid role
 * {
 *   "msg": "El rol del usuario no es válido"
 * }
 * 
 * // Error response for server issues
 * {
 *   "msg": "Error al obtener los datos de Studio Ghibli",
 *   "error": { ...errorDetails }
 * }
 */
const getGhibliData = async (req, res) => {
    try {
        const userRole = req?.user?.role.toUpperCase();        
        const apiUrl = GHIBLI_API_ROUTES[ userRole ];
    
        if (!apiUrl) {
            return res.status(403).json({ msg: ERROR_MESSAGES?.NOT_VALID_ROLE });
        }

        const response = await axios.get(apiUrl);
        return res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from Studio Ghibli API:', error);
        return res.status(500).json({ msg: 'Error al obtener los datos de Studio Ghibli', error });
    }
};

module.exports = {
    getGhibliData
}