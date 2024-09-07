const {response, request} = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');



const jwtValidation = async( req = request ,res = response , next ) => {
    const token = req.header('token');
    if(!token) {
        return res.status(401).json({
            msg : 'No se ha proporcionado token de acceso en la petición'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const user = await User.findById(uid);
        console.log(`usuario nombre :${user}`)
        if( !user ){
            return res.status(401).json({
                msg : 'Token no válido, el usuario no existe'
            }) 
        }
        if( !user.state ){
            return res.status(401).json({
                msg : 'Token no válido'
            })
        }

        req.user = user;

        next()
    }catch(error){
        console.log(error);
        if(error.name === 'TokenExpiredError'){
            return res.status(403).json({ msg: 'El token ha expirado, favor de volver a inciar sesión' });
        }else {
            return res.status(401).json({
                msg : 'token no válido'
            })
        }
    }
}


module.exports = {
    jwtValidation
}