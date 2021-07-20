const { Usuario } = require("../models/user");
const bcryptjs = require('bcryptjs')

const userUpdateData = async(req)=>
{
	const {id:idUpdate} = req.params;
	const updateUser = await Usuario.findById(idUpdate);
	const filterUpdateUser = updateUser.toJSON()
	filterUpdateUser['pass']=updateUser['pass']
	
	const reqBody = await req.body

	const bodyIn = {}

	for(const bodyElem in reqBody)
	{
		for (const userElem in filterUpdateUser)
		{
			if(bodyElem === userElem && filterUpdateUser[`${userElem}`] !== reqBody[`${bodyElem}`])
			{
				if(bodyElem === 'pass')
				{
					const compare = bcryptjs.compareSync(reqBody['pass'],filterUpdateUser['pass'])
					if(!compare)
					{
						bodyIn[`${userElem}`]= reqBody[`${userElem}`]
					}
				}
				else
				{
					bodyIn[`${userElem}`]= reqBody[`${userElem}`]
				}
				
			}
		}
	}

	return bodyIn;
}

module.exports=
{
	userUpdateData
}
