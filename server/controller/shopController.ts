import { Request, Response } from "express";
import Shop from "../model/Shop.js";
import cloudinary from "../config/cloudinary.js";
import Product from "../model/Product.js";




export const getAllShops = async (req: Request, res: Response) => {
    try {
        const shops = await Shop.find();

        return res.json({ success: true, shops });
    } catch (error: any) {
        return res.json({ success: false, message: error.message })
    }
}

export const getShopById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.json({ success: false, message: "Id not found" })
        }

        const shop = await Shop.findById(id);

        if (!shop) {
            return res.json({ success: false, message: "Shop Not found" })
        }

        res.json({ success: true, shop })

    } catch (error: any) {
        return res.json({ success: false, message: error.message })
    }
}

export const getShopByUser = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            res.json({ success: false, message: "Unauthorized!" })
        }

        const shop = await Shop.findOne({ ownerId: user._id });
        if (!shop) {
            return res.json({ success: false, message: "Shop not found" });
        }

        return res.json({ success: true, shop });

    } catch (error: any) {
        return res.json({ success: false, message: error.message })
    }
}

export const addProduct = async (req: Request, res: Response) => {
    try {
        const { name, category, price, quantity, description, shopId } = req.body;
        const user = req.user;
        const images = req.files as Express.Multer.File[];
        if (!name || !category || !price || !quantity || !description || !images || !shopId) {
            return res.json({ success: false, message: "All fields required" })
        }

        const imageUrls = await Promise.all(
            images.map(async (img) => {
                const result = await cloudinary.uploader.upload(img.path, { folder: "products" });
                return result.secure_url;
            })
        );

        const product = await Product.create({
            name,
            category,
            description,
            images: imageUrls,
            price,
            quantity,
            shopId
        })

        return res.json({ success: true, message: "Product Added" })

    } catch (error: any) {
        return res.json({ success: false, message: error.message })
    }
}