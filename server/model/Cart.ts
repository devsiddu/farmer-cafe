import mongoose from "mongoose";
import { ICart } from "../types/index.js";


const cartSchema = new mongoose.Schema<ICart>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId
        },
        items: [{
            product: {
                type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true
            },
            qty: { type: Number, required: true, default: 1, min: 1 }
        }]
    }, {
    timestamps: true,
}
)

const Cart = mongoose.model("Cart", cartSchema);

export default Cart