const express = require('express')
const cors = require('cors');
require('dotenv').config()
const {router:userRoutes} = require('../routes/user.routes');
const { connectDB } = require('../config/config.db');

class Server
{
	constructor()
	{
		this.app = express()
		this.port = process.env.PORT
		this.userRoute = '/api/users'

		//Conectar a BD

		connectDB();

		//Ejecutar Middle Wares
		this.middlewares();

		//Establecer rutas
		this.routes();


	}

	middlewares()
	{
		this.app.use(cors());
		this.app.use(express.json())
		this.app.use(express.static('public'))

	}

	listen()
	{
		console.log('El servidor corre en el puerto: '+this.port)
		this.app.listen(this.port)
	}

	routes()
	{
		this.app.use(this.userRoute,userRoutes)
	}
}

module.exports = Server