const { request, response } = require("express")
const { validationResult } = require("express-validator")

const validarCampos=(req,res,next)=>
{
	if(!validationResult(req).isEmpty())
	{
		res.status(400).json({error:validationResult(req).array()})
		return
	}

	next()
}



module.exports = {validarCampos}