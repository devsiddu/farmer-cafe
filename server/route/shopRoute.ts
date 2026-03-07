import express from "express";
import { getAllShops, getShopById, getShopByUser } from "../controller/shopController.js";
import { auth } from "../middleware/auth.js";
import { roleAuth } from "../middleware/roleAuth.js";


const shopRouter = express.Router();

shopRouter.get("/", getAllShops);
shopRouter.get("/user", auth, roleAuth("shop"), getShopByUser);
shopRouter.get("/:id", getShopById);


export default shopRouter
