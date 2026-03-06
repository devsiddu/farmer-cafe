import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User.js";


export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.json({ success: false, message: "Unauthorized" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string }

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        req.user = user;
        next();
    } catch (error) {
        return res.json({ success: false, message: "Invalid token!" })
    }
}