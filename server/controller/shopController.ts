import { Request, Response } from "express";
import Shop from "../model/Shop.js";




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

