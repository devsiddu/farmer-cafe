import express from "express";
import { isAuth, login, logout, register, switchToShop } from "../controller/userController.js";
import { auth } from "../middleware/auth.js";
import { roleAuth } from "../middleware/roleAuth.js";


const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", logout);
userRouter.get("/auth", auth, isAuth);
userRouter.post("/switch-to-shop", auth, roleAuth("user"), switchToShop)



export default userRouter;