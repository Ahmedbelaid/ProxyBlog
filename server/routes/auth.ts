import { Router } from "express";
const router: Router = Router();
import * as AuthController from "../controllers/AuthController";



router.get("/validate",  AuthController.validateToken);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);



export default router;