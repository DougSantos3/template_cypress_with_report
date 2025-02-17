import Joi from 'joi'

export const loginSchema = Joi.object({
  message: Joi.string().required(),
  authorization: Joi.string().required(),
})
