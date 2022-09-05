import { Request, Response, NextFunction } from "express";
import Posts from "../models/Posts";
import { Ipost } from "../Types/Ipost";
import { PostValidation } from "../Validations/PostValidation";
import {
  PostIdValidation,
  UpdatePostValidation,
} from "../Validations/PostValidation";
import { IUpadatePost } from "../Types/IUpdatePost";

/**
 * add new post
 * @param postModelValidation
 */
const addPost = async (postModelValidation: Ipost) => {
  try {
    const post = new Posts({
      title: postModelValidation.title,
      description: postModelValidation.description,
      writer: postModelValidation.author,
    });
    const savedPost = await post.save();

    return savedPost;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Create a new post
 * @param req
 * @param res
 * @param next
 */
export const CreatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postModelValidation: Ipost = await PostValidation.validateAsync(
      req.body
    );

    if (!postModelValidation) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    } else {
      const newPost = await addPost(postModelValidation);
      if (newPost) {
        res.status(201).json({
          newPost,
        });
      } else {
        return next(
          res.status(400).json({
            message: "Invalid details provided.",
          })
        );
      }
    }
  } catch (err) {
    res.status(404).json
    next(err);
  }
};

/**
 * Get all post
 * @param req
 * @param res
 * @param next
 */
export const getAllPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getPosts = await Posts.find()
      .select("_id title description  createdAt updatedAt")
      .populate("writer", "username  ");

    if (getPosts) {
      res.status(200).json(getPosts);
    } else {
      return next(
        res.status(404).json({
          message: "Not found.",
        })
      );
    }
  } catch (err) {
    res.status(404).json
    next(Error);
  }
};

/**
 * get one post
 * @param req
 * @param res
 * @param next
 */
export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postIdValidation = await PostIdValidation.validateAsync(
      req.params.postId
    );

    if (!postIdValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const getPosts = await Posts.findById(postIdValidation)
        .select("_id title description createdAt    ")
        .populate("writer", "username  ");

      if (getPosts) {
        res.status(200).json(getPosts);
      } else {
        return next(
          res.status(404).json({
            message: "Not found.",
          })
        );
      }
    }
  } catch (error) {
    res.status(404).json
    next(error);
  }
};

/**
 * delete post
 * @param req
 * @param res
 * @param next
 */
export const detelePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postIdValidation = await PostIdValidation.validateAsync(
      req.params.postId
    );

    if (!postIdValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const deletePosts = await Posts.findByIdAndDelete(postIdValidation);

      if (deletePosts) {
        res.status(200).json({
          message:"Post Deleted succesfully",
        });
      } else {
        return next(
          res.status(404).json({
            message: "Not found.",
          })
        );
      }
    }
  } catch (error) {
    res.status(404).json
    next(error);
  }
};

/**
 * Update post
 * @param req
 * @param res
 * @param next
 */
export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resUpdatePostValidation: IUpadatePost = await UpdatePostValidation.validateAsync(
      req.body
    );

    if (!UpdatePostValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const updatedPosts = await Posts.findByIdAndUpdate(
        {
          _id: resUpdatePostValidation.postId,
        },
        {
          $set: {
            title: resUpdatePostValidation.title,
            description: resUpdatePostValidation.description,
          },
        }
      );

      if (updatedPosts) {
        res.status(200).json({
          message:"Post updated succesfully",
        });
      } else {
        return next(
          res.status(404).json({
            message: "Not found.",
          })
        );
      }
    }
  } catch (error) {
    res.status(404).json
    next(error);
  }
};