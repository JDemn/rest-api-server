const { response } = require('express');

/**
 * @middleware hasAvalidRole
 * @description Middleware to validate the role of the user in the request. 
 * It checks if the `role` provided in the request body is included in the list of allowed roles.
 * @param {...string} roles - The roles that are allowed to access the route.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @param {Function} next - Function to pass control to the next middleware.
 * 
 * This middleware checks if the `role` field in the request body matches one of the roles provided as arguments.
 * If the role is not valid, it responds with a 401 status code and a message indicating the required roles.
 * If an error occurs, it logs the error and responds with a 500 status code and a generic error message.
 */
const hasAvalidRole = ( ...roles )=>{
    try{
        return ( req,res = response,next )=>{
            if( !req.user ){
                return res.status(500).json({
                    msg : "se quiere verificar el role sin validar primero el token"
                });
            }
            if( !roles.includes( req.user.role ) ){
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

/**
 * @middleware toUpperCaseRole
 * @description Middleware that converts the `role` field value to uppercase, if present in the request body.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @param {Function} next - Function to pass control to the next middleware.
 * 
 * This middleware ensures that the `role` field in the request body is stored in uppercase. 
 * If no `role` is provided, it simply continues the request processing flow.
 */
const toUpperCaseRole = (req, res, next) => {
    if (req.body.role) {
        req.body.role = req.body.role.toUpperCase();
    }
    next();
};


module.exports = {
    hasAvalidRole,
    toUpperCaseRole
}