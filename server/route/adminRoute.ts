import express from "express";
import { roleAuth } from "../middleware/roleAuth.js";
import { getAllUser } from "../controller/adminController.js";
import { auth } from "../middleware/auth.js";



const adminRouter = express.Router();

adminRouter.get("/users", auth,roleAuth("admin"), getAllUser);

export default adminRouter;