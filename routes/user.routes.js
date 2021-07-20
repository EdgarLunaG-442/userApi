const {Router} = require('express');

const {check,query}=require('express-validator');

const {roleValidator, existEmailValidator, userUpdateFields, verificarMinMax} = require('../helpers/db-validators');
const { userPost, userPut, userListGet } = require('../controllers/user.controller');
const { validarCampos } = require('../middlewares/validar-campos');




const router = Router();

router.post('/',
	[
		check('correo','El correo no es valido').isEmail(),
		check('correo').custom(existEmailValidator),
		check('nombre','El nombre es nulo o incorrecto').notEmpty(),
		check('pass','La contrasena debe ser de mas de 6 letras').isLength({min:6}),
		check('rol').custom(roleValidator),
		validarCampos
	]
	,userPost
)

router.put('/:id',
	[
		check('req').custom(userUpdateFields),
		check('nombre','El nombre es nulo o incorrecto').notEmpty(),
		check('correo').custom(existEmailValidator),
		check('pass','La contrasena debe ser de mas de 6 letras').isLength({min:6}),
		check('rol').custom(roleValidator),
		validarCampos
	],userPut
	)

	router.get('/',
	[
		query().custom(verificarMinMax),
		validarCampos
	]
	,userListGet)

module.exports =
{
	router 
}