import mongoose from "mongoose";
import { IBooking } from "../types/index.js";

const bookingSchema = new mongoose.Schema<IBooking>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [{
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            qty: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true, min: 1 },
            totalAmount: { type: Number, required: true, min: 1 }
        }],
        status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
        totalAmount: { type: Number, required: true }
    }, {
    timestamps: true
}
)

const Booking = mongoose.model("Booking", bookingSchema)
export default Booking