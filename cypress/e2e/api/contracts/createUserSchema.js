import Joi from 'joi'

export const createUserSchema = Joi.object({
  message: Joi.string().required().equal('Cadastro realizado com sucesso'),
  _id: Joi.string().min(1).required(),
})
