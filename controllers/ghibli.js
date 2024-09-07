
const axios = require('axios');
const { ERROR_MESSAGES, GHIBLI_API_ROUTES } = require('../constants/constants');

const getGhibliData = async (req, res) => {
    try {
        const userRole = req.user.role.toUpperCase();
        console.log("USER ROLE", userRole)
        const apiUrl = GHIBLI_API_ROUTES[ userRole ];
        console.log("llamando a recurso", apiUrl)
        if (!apiUrl) {
            return res.status(403).json({ message: ERROR_MESSAGES?.NOT_VALID_ROLE });
        }

        const response = await axios.get(apiUrl);
        return res.json(response.data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error al obtener los datos de Studio Ghibli', error });
    }
};

module.exports = {
    getGhibliData
}