const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config')

const http = require('http'); 
const { API_ROUTES } = require('../constants/constants');
const { logRequestDetails, errorMiddleware } = require('../middlewares');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8083;
        this.hostname = '0.0.0.0'
        this.server = http.createServer(this.app);
        
        this.path = {
            user : API_ROUTES?.USERS,
            auth : API_ROUTES?.AUTH,
            gibli : API_ROUTES?.GIBLI_RESOURCES
        }

        this.conectarDb();        
        this.middlewares();        
        this.routes();
        this.errorHandling();
    }

    async conectarDb() {
        await dbConnection()
    }

    middlewares() {        
        const allowedOrigins = ['http://localhost:3000'];
        this.app.use(cors({
            origin: allowedOrigins,
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            preflightContinue: false,
            optionsSuccessStatus: 204
        }));

        this.app.use(express.json());
        this.app.use( logRequestDetails );
    }
    routes() {
        this.app.use(this.path.user, require('../routes/user'));
        this.app.use( this.path.auth, require('../routes/auth'));
        this.app.use( this.path.gibli, require('../routes/gibli'));
    }
    
    errorHandling() {        
        this.app.use(errorMiddleware);
    }

    listen() {
        this.server.listen(this.port, this.hostname,() => {
            console.log('Servidor corriendo en el puerto:', this.port);
        })
    }
}


module.exports = Server;