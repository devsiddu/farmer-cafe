import { Request, Response } from "express";
import Cart from "../model/Cart.js";
import Product from "../model/Product.js";
import Booking from "../model/Booking.js";
import Shop from "../model/Shop.js";



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
                status: "pending",
                totalAmount: i.qty * product.price
            }
        })

        const booking = await Booking.create({
            user: user._id,
            items: bookingItems
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

        const bookings = await Booking.find({ user: user._id })
            .populate({
                path: "items.product",
                select: "name price images shopId",
                populate: {
                    path: "shopId",
                    select: "shopName location image phone"
                }
            });
        if (!bookings) {
            return res.json({ success: false, message: "no products booked" })
        }

        return res.json({ success: true, bookings: bookings })
    } catch (error: any) {
        console.error(error.message)
        return res.json({ success: false, message: error.message });
    }
}

export const cancelBooking = async (req: Request, res: Response) => {
    try {
        const { itemId } = req.params;
        const user = req.user;

        if (!itemId) {
            return res.json({ success: false, message: "Id not found" });
        }

        const bookings = await Booking.find({ user: user._id });

        let targetBooking: any = null;
        let targetItem: any = null;

        for (const booking of bookings) {
            const item = booking.items.find(
                (i: any) => i._id.toString() === itemId
            );

            if (item) {
                targetBooking = booking;
                targetItem = item;
                break;
            }
        }

        if (!targetItem) {
            return res.json({ success: false, message: "Item not found" });
        }

        const product = await Product.findById(targetItem.product);

        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        // restore stock
        product.quantity += targetItem.qty;
        await product.save();

        // update status
        targetItem.status = "cancelled";

        await targetBooking.save();

        return res.json({ success: true, message: "Booking Cancelled!" });

    } catch (error: any) {
        return res.json({ success: false, message: error.message });
    }
};

export const shopBookings = async (req: Request, res: Response) => {
    try {
        const user = req.user;

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const shops = await Shop.find({ ownerId: user._id });

        if (!shops.length) {
            return res.json({ success: false, message: "shop not found" });
        }

        const shopIds = shops.map((s) => s._id.toString());

        const bookings = await Booking.find().populate("items.product");

        const filteredBookings = bookings.filter((booking) =>
            booking.items.some((item: any) =>
                shopIds.includes(item.product.shopId.toString())
            )
        );

        return res.json({ success: true, bookings: filteredBookings });

    } catch (error: any) {
        return res.json({ success: false, message: error.message });
    }
};