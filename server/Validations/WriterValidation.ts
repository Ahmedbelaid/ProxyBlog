import Joi from "joi";

export const WriterValidation = Joi.object({
  email: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  
});

export const WriterIdValidation = Joi.string().alphanum().required();