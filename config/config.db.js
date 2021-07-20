const mongoose = require('mongoose');

const connectDB = async ()=>
{
	try{
		await mongoose.connect(process.env.CONN_STRING, 
			{
				useNewUrlParser: true, 
				useUnifiedTopology: true
			}
	
		)
	console.log('Se conecto correctamente')
}

	catch(e)
	{
		console.log('ERROR conectando a la BD')
	}
	
}

module.exports = 
{
	connectDB
}
