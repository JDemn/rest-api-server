const { response } = require('express');

const hasAvalidRole = ( ...roles )=>{
    try{
        return (req,res = response,next)=>{

            if( !roles.includes(req.body.role)){
                return res.status(401).json({
                    msg : `El servicio requiere uno de estos roles ${roles}`
                })
            }

            next();
        }

    }catch(err){
        connsole.log(err);
        return res.status(500).json({msg:"Error en el servicio, comuniquese con el administrador"})
    }
}

module.exports = {
    hasAvalidRole
}