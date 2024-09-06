const { response, request } = require('express');
const { validationResult } = require('express-validator');
const { ERROR_MESSAGES } = require('../constants/constants');

/**
 * @middleware
 * @description This validate the body or param entries, it return an error if exist. 
 * @param req Express request object
 * @param res Express response object
 * @returns {Object} 400 - Error message if the request body is empty
 * @returns {Object} 500 - Server error message
 */
const fieldValidation =( req = request, res = response,next ) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){return res.status(400).json(errors)}
        
        next();

    }catch(err){
        console.log(err);
        return res.status(500).json({msg : ERROR_MESSAGES?.SERVER_ERROR})
    }
}

/**
 * @middleware
 * @description Checks if the request body is empty. If so, returns a 400 error.
 * @route Applied to routes requiring non-empty request body
 * @access Private
 * @returns {Object} 400 - Error message if the request body is empty
 * @returns {Object} 500 - Server error message
 * @next Passes control to the next middleware or controller if the request body is not empty
 */
const fieldsEmpy = ( req = request, res = response, next ) => {
    try{
        if ( Object.keys( req?.body )?.length === 0 ) {
            return res.status(400).json({
                msg: 'No hay data que actualizar'
            });
        }
        next();
    }catch( err ){
        console.log("Error", err )
        return res.status(500).json({msg : ERROR_MESSAGES?.SERVER_ERROR})
    }
}

module.exports = {
    fieldValidation,
    fieldsEmpy
}