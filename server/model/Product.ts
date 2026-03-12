import mongoose from "mongoose";
import { IProduct } from "../types/index.js";

const productSchema = new mongoose.Schema<IProduct>(
    {
        name: { type: String, required: true },
        shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        quantity: { type: Number, required: true, min: 0 },
        rating: { type: Number, default: 0, min: 0, max: 5 },
        images: {
            type: [String],
            required: true,
            validate: [(arr: string[]) => arr.length > 0, "At least one image required"]
        }
    }, {
    timestamps: true
}
)

const Product = mongoose.model("Product", productSchema);

export default Product;