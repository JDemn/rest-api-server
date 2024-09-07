const { response } = require('express');
const bcryptjs = require('bcryptjs')
const User = require('../../models/user')
const Auth = require('../../models/auth');
const { createJWT } = require('../../helpers/createJWT');

/**
 * @function auth
 * @description Handles user authentication by validating email and password. If successful, it generates a JWT token for the authenticated user.
 * @param   {Object} req - Express request object containing email and password in the body.
 * @param   {string} req.body.email - The email address provided by the user.
 * @param   {string} req.body.password - The password provided by the user.
 * @param   {Object} res - Express response object used to send back the authentication result.
 * @returns {Object} 200 - Returns the authenticated user and a JWT token if successful.
 * @returns {Object} 400 - Returns an error message if the user credentials are incorrect or the account is inactive.
 * @returns {Object} 500 - Returns an error message if there is an internal server error.
 * 
 * @throws {Error} If any error occurs during authentication, returns a 500 error response.
 * 
 * @example
 * // Request body
 * {
 *   "email": "example@example.com",
 *   "password": "password123"
 * }
 * 
 * // Successful response
 * {
 *   "usuario": { ...userData },
 *   "token": "jwtTokenHere"
 * }
 */
const auth = async ( req, res = response , next ) => {
    try {
        const { email, password } = req.body;
        const usuario = await User.findOne({ email });
        
        if (!usuario) {
            return res.status(400).json({ msg: 'Usuario / Password no son correctos' });
        }

        if (!usuario?.state) {
            return res.status(400).json({ msg: 'La cuenta que intentas ingresar está inactiva' });
        } 
        
        const auth = await Auth.findOne({ user: usuario?._id }).lean();
        if (!auth) {
            return res.status(400).json({ msg: 'Usuario / Password no son correctos' });
        } 

        const validarContrasena = await bcryptjs.compare(password, auth.password);
        if (!validarContrasena) {
            return res.status(400).json({
                msg: "Credenciales incorrectas"
            })
        }

        const token = await createJWT(usuario.id)
        return res.json({
            usuario,
            token
        })
    } catch (error) {        
        next( error )
    }
}

module.exports = {
    auth
}