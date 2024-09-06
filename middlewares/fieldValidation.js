const { response, request } = require('express');
const { validationResult } = require('express-validator');
const { ERROR_MESSAGES } = require('../constants/constants');
/**
 * @description This validate the body or param entries, it return an error if exist. 
 * @param req Express request
 * @param res Express response
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