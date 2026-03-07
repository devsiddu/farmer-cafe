import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../model/User.js";
import jwt from 'jsonwebtoken'
import Shop from "../model/Shop.js";


export const register = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password, phone } = req.body;
        if (!firstName || !lastName || !email || !password || !phone) {
            return res.json({ success: false, message: "All fields are required!" })
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exist with this email!" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const imageUrl = `https://api.dicebear.com/7.x/thumbs/svg?seed=${firstName}`;
        const user = await User.create({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            imageUrl,
        })

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.json({ success: true, message: "Registration Successful!", user })

    } catch (error: any) {
        res.json({ success: false, message: error.message })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "All fields are required!" })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Wrong password!" })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({ success: true, message: "Logged in successful!", user })

    } catch (error: any) {
        res.json({ success: false, message: error.message })
    }
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie("token");

    return res.json({ success: true, message: "Logged out successful" })
}

export const isAuth = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        res.json({
            success: true,
            user: req.user
        });
    } catch (error: any) {
        return res.json({ success: false, message: error.message })
    }
}

export const switchToShop = async (req: Request, res: Response) => {
    try {
        const { shopName, location } = req.body;
        const user = req.user;
        // const {image} = req.files;

        if (!shopName || !location || shopName === "" || location === "") {
            return res.json({ success: false, message: "All fields are required!" })
        }

        if (!user) {
            return res.json({ success: false, message: "Unauthorized!" })
        }

        const existUser = await User.findById(user._id);

        if (!existUser) {
            return res.json({ success: false, message: "User not found" })
        }

        if (existUser.role === "shop") {
            return res.json({ success: false, message: "You are already a shop owner" })
        }

        const existShop = await Shop.findOne({ ownerId: existUser._id });

        if (existShop) {
            return res.json({ success: false, message: "Shop already exists" })
        }

        const shop = await Shop.create({
            shopName,
            location,
            ownerId: existUser._id,
            ownerName: `${existUser.firstName} ${existUser.lastName}`,
            image: "test",
            phone: existUser.phone,
            status: "pending"
        })

        if (shop) {
            existUser.role = "shop";
            await existUser.save();
        }

        res.json({ success: true, message: "Shop created successfully!", shop })
    } catch (error: any) {
        return res.json({ success: false, message: error.message })
    }
}