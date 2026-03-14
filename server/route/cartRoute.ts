import express from "express";
import { auth } from "../middleware/auth.js";
import { addToCart, clearCart, getCart, removeFromCart, updateCartQty } from "../controller/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/", auth, addToCart)
cartRouter.get("/", auth, getCart)
cartRouter.patch("/:productId", auth, updateCartQty)
cartRouter.delete("/:productId", auth, removeFromCart)
cartRouter.delete("/", auth, clearCart)

export default cartRouter