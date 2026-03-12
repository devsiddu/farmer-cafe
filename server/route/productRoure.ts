import express from "express";
import { getAllProducts, getProductById } from "../controller/productController.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);


export default productRouter
