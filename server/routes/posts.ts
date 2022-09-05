import { Router } from "express";
const router: Router = Router();
import * as PostsController from "../controllers/PostsController";

//create post
router.post("/", PostsController.CreatePost);

//get all post
router.get("/", PostsController.getAllPost);

//get one post
router.get("/:postId", PostsController.getPost);

//update post
router.patch("/", PostsController.updatePost);

//delete post
router.delete("/:postId", PostsController.detelePost);

export default router;