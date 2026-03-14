import { Request, Response } from "express";
import Cart from "../model/Cart.js";

// POST: /api/cart

export const addToCart = async (req: Request, res: Response) => {
    try {
        const { product, qty } = req.body;
        const user = req.user;

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const cart = await Cart.findOne({ user: user._id });

        if (!cart) {
            await Cart.create({
                user: user._id,
                items: [{ product, qty }]
            });

            return res.json({ success: true, message: "Added to cart" });
        }

        const item = cart.items.find(
            (i) => i.product.toString() === product
        );

        if (item) {
            item.qty += qty;
        } else {
            cart.items.push({ product, qty });
        }

        await cart.save();

        res.json({ success: true, message: "Cart updated" });

    } catch (error: any) {
        res.json({ success: false, message: error.message });
    }
};

export const getCart = async (req: Request, res: Response) => {
    try {

        const user = req.user;

        const cart = await Cart.findOne({ user: user._id })
            .populate("items.product");

        res.json({
            success: true,
            cart: cart ? cart.items : []
        });

    } catch (error: any) {
        res.json({ success: false, message: error.message });
    }
};

export const updateCartQty = async (req: Request, res: Response) => {
    try {

        const { productId } = req.params;
        const { qty } = req.body;
        const user = req.user;

        const cart = await Cart.findOne({ user: user._id });

        if (!cart) {
            return res.json({ success: false, message: "Cart not found" });
        }

        const item = cart.items.find(
            (i) => i.product.toString() === productId
        );

        if (!item) {
            return res.json({ success: false, message: "Item not found" });
        }

        item.qty = qty;

        await cart.save();

        res.json({ success: true, message: "Quantity updated" });

    } catch (error: any) {
        res.json({ success: false, message: error.message });
    }
};

export const removeFromCart = async (req: Request, res: Response) => {
    try {

        const { productId } = req.params;
        const user = req.user;

        await Cart.updateOne(
            { user: user._id },
            { $pull: { items: { product: productId } } }
        );

        res.json({ success: true, message: "Product removed" });

    } catch (error: any) {
        res.json({ success: false, message: error.message });
    }
};

export const clearCart = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }
        await Cart.updateOne({ user: user._id }, { $set: { items: [] } });

        return res.json({ success: true, message: "Cart cleared" })

    } catch (error: any) {
        res.json({ success: false, message: error.message });
    }
}