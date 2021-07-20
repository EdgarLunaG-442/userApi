const {Schema,model} = require('mongoose');

const schema  = new Schema(
	{
		nombre:
		{
			type: String,
			required: true
		},
		pass:
		{
			type: String,
			required: true
		},
		correo:
		{
			type: String,
			required: true,
			unique: true
		},
		google:
		{
			type:Boolean,
			default:false
		},
		rol:
		{
			type: String,
			enum:['ADMIN','USER'],
			default: 'USER'
		}
	}
)

schema.methods.toJSON = function()
{
	const {__v,pass,...usr} = this.toObject();
	return usr
}

const Usuario = model('Usuario',schema)

module.exports=
{
	Usuario
}