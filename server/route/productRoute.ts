import express from "express";
import { deleteProduct, getAllProducts, getProductById, updateQuantity } from "../controller/productController.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.patch("/:id/quantity", updateQuantity);
productRouter.delete("/:id", deleteProduct);


export default productRouter
