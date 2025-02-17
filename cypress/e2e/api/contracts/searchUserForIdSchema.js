import Joi from 'joi'

export const searchUserIdSchema = Joi.object({
  nome: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email()
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    .required(),
  password: Joi.string().min(6).required(),
  administrador: Joi.string().valid('true', 'false').required(),
  _id: Joi.string().length(24).required(),
})
