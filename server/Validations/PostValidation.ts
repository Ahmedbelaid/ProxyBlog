import Joi from "joi";

export const PostValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const PostIdValidation = Joi.string().required();

export const UpdatePostValidation = Joi.object({
  postId: Joi.string().alphanum().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  
});