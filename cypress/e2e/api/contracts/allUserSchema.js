import Joi from 'joi'

export const allUserSchema = Joi.object({
  quantidade: Joi.number().integer().min(0).max(9007199254740991).required(),
  usuarios: Joi.array().items(Joi.object({})).min(0).required(),
})
