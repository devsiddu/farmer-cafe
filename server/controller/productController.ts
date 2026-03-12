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
        const product = await Product.findById(id);
        if (!product) {
            return res.json({ success: false, message: "Product not found" })
        }

        return res.json({ success: true, product })
    } catch (error: any) {
        return res.json({ success: false, message: error.message })
    }
}