const { response } = require('express');
const bcryptjs = require('bcryptjs')
const User = require('../../models/user')
const Authentication = require('../../models/auth');
const { createJWT } = require('../../helpers/createJWT');

const auth = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        const usuario = await User.findOne({ email });
        
        if (!usuario) {
            return res.status(400).json({ msg: 'Usuario / Password no son correctos' });
        }

        if (!usuario.estado) {
            return res.status(400).json({ msg: 'La cuenta que intentas ingresar está inactiva' });
        } 
        
        const auth = await Authentication.findOne({ user: usuario._id }).lean();
        
        if (!auth) {
            return res.status(400).json({ msg: 'Usuario / Password no son correctos' });
        }        
        console.time('validatePassword');
        const validarContrasena = bcryptjs.compare(password, auth.password);
        console.timeEnd('validatePassword');

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
        console.log(error);
        return res.status(500).json({
            msg: 'Error en la autenticación, comuniquese con el administrador'
        })
    }
}

module.exports = {
    auth
}