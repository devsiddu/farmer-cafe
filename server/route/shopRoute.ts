import express from "express";
import { addProduct, getAllShops, getShopById, getShopByUser } from "../controller/shopController.js";
import { auth } from "../middleware/auth.js";
import { roleAuth } from "../middleware/roleAuth.js";
import { upload } from "../config/multer.js";


const shopRouter = express.Router();

shopRouter.get("/", getAllShops);
shopRouter.get("/user", auth, roleAuth("shop"), getShopByUser);
shopRouter.get("/:id", getShopById);
shopRouter.post("/add-product",upload.array("images",4),auth, roleAuth("shop"),addProduct);


export default shopRouter
