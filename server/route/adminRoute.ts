import express from "express";
import { roleAuth } from "../middleware/roleAuth.js";
import { getAllShops, getAllUser, toggleShop } from "../controller/adminController.js";
import { auth } from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.get("/users", auth, roleAuth("admin"), getAllUser);
adminRouter.get("/shops", auth, roleAuth("admin"), getAllShops);
adminRouter.patch("/shop/:id/status", auth, roleAuth("admin"), toggleShop);

export default adminRouter;
