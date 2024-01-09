import Joi from "joi"

// 1
export const todo = Joi.object().keys({
  text: Joi.string().required(),
})
export const todo_update = Joi.object().keys({
  text: Joi.string(),
})
//
// 1
export const users_joi = Joi.object().keys({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
})

export const login_joi = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

export const users_pacht = Joi.object().keys({
  first_name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
})
