import { Router } from "express";
import { getUser } from "../controller/userController.js";

const userRouter = Router();

userRouter.get("/", getUser);

export default userRouter;
