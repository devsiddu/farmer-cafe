import express from "express";
import { isAuth, login, logout, register } from "../controller/userController.js";
import { auth } from "../middleware/auth.js";


const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", logout);
userRouter.get("/auth", auth, isAuth);



export default userRouter;