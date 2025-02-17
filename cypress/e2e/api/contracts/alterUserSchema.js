import Joi from 'joi'

export const alterUserSchema = Joi.object({
  message: Joi.string().required().equal('Registro alterado com sucesso'),
  _id: Joi.string().min(1).required(),
})
