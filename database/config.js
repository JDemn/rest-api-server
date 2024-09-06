const mongoose = require('mongoose');

const dbname = process.env.DB_NAME ;

const clusterMongo = `${process.env.MONGODB_CNN}/${dbname}`;
console.log('CLUSTER MONGO :')

const dbConnection = async()=>{
    try {
        mongoose.connect(clusterMongo);
        console.log('base de datos online:')
    }catch(error){
        console.log(error)
        throw new Error('Error al iniciar conexión a la base de datos')
    }
}

module.exports = {
    dbConnection
}