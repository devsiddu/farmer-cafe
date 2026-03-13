import { Request, Response } from "express";
import Product from "../model/Product.js";


// GET: /api/products
// get all products

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find().populate("shopId", "shopName location phone");
        if (!products) {
            return res.json({ success: false, message: "No products found" })
        }

        return res.json({ success: true, products });
    } catch (error: any) {
        return res.json({ success: false, message: error.message })
    }
}

// GET: /api/products/:id
// get product by id

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.json({ success: false, message: "Id not found" })
        }
        const product = await Product.findById(id).populate("shopId", "shopName location phone");
        if (!product) {
            return res.json({ success: false, message: "Product not found" })
        }

        return res.json({ success: true, product })
    } catch (error: any) {
        return res.json({ success: false, message: error.message })
    }
}

// PATCH: /api/products/:id/quantity
// update product quantity

export const updateQuantity = async (req: Request, res: Response) => {
    try {
        const { quantity } = req.body;
        const { id } = req.params;
        if (quantity === undefined || quantity === null) {
            return res.json({ success: false, message: "Quantity missing" })
        }
        if (!id) {
            return res.json({ success: false, message: "Id missing" })
        }
        const product = await Product.findById(id);
        if (!product) {
            return res.json({ success: false, message: "Product not found" })
        }

        product.quantity = quantity;
        await product.save();

        return res.json({ success: true, message: "Quantity Updated!" })

    } catch (error: any) {
        return res.json({ success: false, message: error.message })
    }
}


// DELETE: /api/products/:id
// delete the product

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.json({ success: false, message: "Id not found" })
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.json({ success: false, message: "Product not found" })
        }

        await Product.findByIdAndDelete(id);
        return res.json({ success: true, message: "Product Deleted!" })
    } catch (error: any) {
        return res.json({ success: false, message: error.message })
    }
}