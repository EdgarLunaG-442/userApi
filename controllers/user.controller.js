const { Usuario } = require("../models/user");
const bcrypt = require('bcryptjs');
const { request } = require("express");
const { userUpdateData } = require("../helpers/user-update-data");

const userPost =async (req,res)=>
{
	const {nombre,pass,correo} = req.body;

	try{
		const newUser = await new Usuario({nombre,pass,correo})
		const salt = bcrypt.genSaltSync(10);
		if (newUser)
		{
			newUser.pass = bcrypt.hashSync(newUser.pass,salt);
			await newUser.save();
			res.json(newUser.toJSON())
		}
	}
	catch(e)
	{
		res.json(e)
	}
}

const userPut = async(req = request,res)=>
{
	try
	{
		const {id:idUpdate} = req.params
		const resto = await userUpdateData(req)
		if(resto['pass'])
		{
			resto['pass'] = bcrypt.hashSync(resto['pass'],bcrypt.genSaltSync(10));
		}
		const updateUser = await Usuario.findByIdAndUpdate(idUpdate,resto);
		await updateUser.save()
		res.json(updateUser.toJSON())
	}
	catch(e)
	{
		res.json(e)
	}

}

const userListGet=async(req=request,res)=>
{
	
	let {min=0,max=3} = req.query;
	min = Number(min);
	max = Number(max);
	const [cuenta,usuarios,total] = await Promise.all(
			[
				Usuario.find().skip(min).limit(max).count(),
				Usuario.find().skip(min).limit(max),
				Usuario.find().count()
			]
		)
	res.json({cuenta,total,usuarios})
}

module.exports=
{
	userPost,
	userPut,
	userListGet
}