import express from "express";
import { auth } from "../middleware/auth.js";
import { addToCart, getUserCart } from "../controller/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/", auth, addToCart)
cartRouter.get("/", auth, getUserCart)

export default cartRouter