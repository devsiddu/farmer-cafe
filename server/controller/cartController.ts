import { Request, Response } from "express";
import Cart from "../model/Cart.js";

// POST: /api/cart

export const addToCart = async (req: Request, res: Response) => {
    try {
        const { product, qty } = req.body;
        const user = req.user;
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }
        if (!product || !qty) {
            return res.json({ success: false, message: "All fields required" })
        }

        let cart = await Cart.findOne({ user: user._id });

        // if cart does't exist then create
        if (!cart) {
            cart = await Cart.create({
                user: user._id,
                items: [{ product, qty }]
            })

            return res.json({ success: true, message: "Added to cart" })
        }

        // if product exist then update product quantity else push new product
        const existingProduct = cart.items.find((item) => item.product.toString() === product);

        if (existingProduct) {
            existingProduct.qty += qty
        } else {
            cart.items.push({ product, qty })
        }

        await cart.save();

        return res.json({ success: true, message: "Cart updated" })

    } catch (error: any) {
        return res.json({ success: false, message: error.message })
    }
}

export const getUserCart = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        const cart = await Cart.find({ user: user._id }).populate("items.product");
        if (!cart) {
            return res.json({ success: false, message: "Cart empty" })
        }
        return res.json({ success: true, cart })
    } catch (error: any) {
        return res.json({ success: false, message: error.message })
    }
}