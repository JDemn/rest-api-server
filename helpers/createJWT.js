const jwt = require('jsonwebtoken')

/**
 * @function createJWT
 * @description Generates a JSON Web Token (JWT) with a specified user ID (uid) as the payload. The token is signed using the secret or private key defined in the environment variables.
 * @param {string} uid - User ID to include in the JWT payload.
 * @returns {Promise<string>} A promise that resolves with the generated JWT token or rejects with an error message.
 * @throws {Error} Rejects the promise if there is an error generating the token.
 * 
 * @example
 * createJWT('12345')
 *  .then(token => {
 *    console.log('Generated token:', token);
 *  })
 *  .catch(error => {
 *    console.error('Error generating token:', error);
 *  });
 */
const createJWT =( uid='' )=>{
    return new Promise((resolve,reject)=>{
        const payload = { uid };
        jwt.sign( payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn : '10h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el JWT')
            }else {
                resolve( token );
            }
        })
    })

}

module.exports = {
    createJWT
}