import { Request, Response } from "express";
import User from "../model/User.js";



export const getAllUser = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.json({ success: false, message: "No user found" });
        }

        return res.json({ success: true, users })

    } catch (error: any) {
        return res.json({ success: false, message: error.message })
    }
}