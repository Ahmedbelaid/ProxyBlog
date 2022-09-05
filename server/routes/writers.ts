import { Router } from "express";
const router: Router = Router();
import * as WriterController from "../controllers/WriterController";


//create writer
router.post("/", WriterController.createWriter);

//get Writer
router.get("/:writerId", WriterController.getWriter);

//get all writers
router.get("/", WriterController.getAllWriters);

//update Writer
router.patch("/", WriterController.updateWriter);

//delete Writer
 router.delete("/:writerId", WriterController.deteleWriter);

export default router;