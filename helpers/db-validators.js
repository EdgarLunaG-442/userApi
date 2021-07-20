
const { Usuario } = require("../models/user");
const Role = require('../models/rol');
const { userUpdateData } = require("./user-update-data");
const { request } = require("express");

const roleValidator = async(rol='')=>
{
	const existeRol = await Role.findOne({rol});
	if(!existeRol)
	{
		throw new Error(`El rol ${rol} no esta registrado`)
	}
}

const existEmailValidator = async(correo,{req=request})=>
{
	console.log(req.method)
	if(req.method === "PUT")
	{
		const {id:idParams}=req.params
		const actualUserParams = await Usuario.findById(idParams)
		const {correo:emailUserDB} = actualUserParams.toJSON(); 
		if(correo !== emailUserDB)
		{
			if(await Usuario.findOne({correo}))
			{
				throw new Error(`El correo ${correo} ya esta registrado`)
			}
		}
	}
	else
	{
		if(await Usuario.findOne({correo}))
		{
			throw new Error(`El correo ${correo} ya esta registrado`)
		}
	}

}

const userUpdateFields= async(value,{req})=>
{
	const bodyIn = await userUpdateData(req)	
	if(Object.keys(bodyIn).length === 0)
	{
		throw new Error('No hay datos de entrada distintos a los que se encuentran en la BD')
	}
}

const verificarMinMax = async(query)=>
{		

		let {min,max}=query;
		if(min)
		{
			min = Number(min);
			if(!min && min !== 0)
			{
				throw new Error('El min no es un valor numerico')
			}
		}
		if(max)
		{
			max = Number(max);
			if(!max && max !==0)
			{
				throw new Error('El max no es un valor numerico')
			}
		}

}

module.exports = 
{
	roleValidator,
	existEmailValidator,
	userUpdateFields,
	verificarMinMax
}