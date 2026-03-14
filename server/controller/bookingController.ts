import { Request, Response } from "express";
import Cart from "../model/Cart.js";
import Product from "../model/Product.js";
import Booking from "../model/Booking.js";



export const checkout = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        const cart = await Cart.findOne({ user: user._id }).populate("items.product");

        if (!cart) {
            return res.json({ success: false, message: "Cart is empty" })
        }

        for (const item of cart.items) {
            const product = item.product as any

            if (item.qty > product.quantity) {
                return res.json({ success: false, message: `${product.name} only has ${product.quantity} left` })
            }
        }

        // reduce qty 

        for (const item of cart.items) {
            await Product.findOneAndUpdate({
                _id: item.product._id,
                quantity: { $gte: item.qty }
            }, {
                $inc: { quantity: -item.qty }
            })
        }

        const bookingItems = cart.items.map((i) => {
            const product = i.product as any

            return {
                product: product._id,
                qty: i.qty,
                price: product.price,
                totalAmount: i.qty * product.price
            }
        })

        const totalAmount = bookingItems.reduce((sum, item) => sum + item.totalAmount, 0);

        const booking = await Booking.create({
            user: user._id,
            items: bookingItems,
            totalAmount
        })
        if (booking) {
            await Cart.updateOne({ user: user._id }, { $set: { items: [] } })
        }

        return res.json({ success: true, message: "booked successful" })

    } catch (error: any) {
        return res.json({ success: false, message: error.message })
    }
}

export const userBookings = async (req: Request, res: Response) => {
    try {
        const user = req.user;

        if (!user) {
            return res.json({ success: false, message: "user not found" })
        }

        const bookings = await Booking.findOne({ user: user._id }).populate("items.product");
        if (!bookings) {
            return res.json({ success: false, message: "no products booked" })
        }

        return res.json({ success: true, bookings: bookings.items })
    } catch (error: any) {
        console.error(error.message)
        return res.json({ success: false, message: error.message });
    }
}