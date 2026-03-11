import { Request, Response } from "express";
import User from "../model/User.js";
import Shop from "../model/Shop.js";

// GET: /api/admin/users
// get all users

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.json({ success: false, message: "No user found" });
    }

    return res.json({ success: true, users });
  } catch (error: any) {
    return res.json({ success: false, message: error.message });
  }
};

// GET: /api/admin/shops
// get all shops

export const getAllShops = async (req: Request, res: Response) => {
  try {
    const shops = await Shop.find();
    if (!shops) {
      return res.json({ success: false, message: "No shops found" });
    }

    return res.json({ success: true, shops });
  } catch (error: any) {
    return res.json({ success: false, message: error.message });
  }
};

// PATCH: /api/admin/shop/:id/status
// toggle shop status

export const toggleShop = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      return res.json({ success: false, message: "All fields are required" })
    }
    const shop = await Shop.findById(id);

    if (!shop) {
      return res.json({ success: false, message: "Shop not found" })
    }

    shop.status = status;
    await shop.save();

    res.json({ success: true, message: "Updated shop" })

  } catch (error: any) {
    return res.json({ success: false, message: error.message })
  }
}