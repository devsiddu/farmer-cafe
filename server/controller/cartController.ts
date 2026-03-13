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

        const existingProduct = await Cart.findOne({ "items.product": product });
        if (existingProduct) {
            existingProduct.items.qty += qty;
            await existingProduct.save();
            return res.json({ success: true, message: "Quantity Updated" });
        }

        const cart = await Cart.create({
            user: user._id,
            items: [{
                product,
                qty
            }]
        })

        return res.json({ success: true, message: "Added to cart" });

    } catch (error: any) {
        return res.json({ success: false, message: error.message })
    }
}