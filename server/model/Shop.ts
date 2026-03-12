import mongoose from "mongoose";
import { IShop } from "../types/index.js";


const shopSchema = new mongoose.Schema<IShop>(
    {
        shopName: { type: String, required: true },
        location: { type: String, required: true },
        ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        ownerName: { type: String, required: true },
        image: { type: String, required: true },
        phone: { type: String, required: true },
        rating: { type: Number, default: 2 },
        isOpen: { type: Boolean, default: true },
        status: { type: String, enum: ["pending", "rejected", "approved","closed"], default: "pending" },
        isDeleted: {type: Boolean, default: false},
        deletedAt: {type: Date, default: null}
    }, {
    timestamps: true
}
)

const Shop = mongoose.model("Shop", shopSchema);

export default Shop