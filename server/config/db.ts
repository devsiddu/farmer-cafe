import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const uri = process.env.MONGO_URI!;
        mongoose.connection.on("connected", () => {
            console.log("db connected");
        })
        await mongoose.connect(uri);
    } catch (error: any) {
        console.error("Failed to connect to database: " + error.message);

    }
}

export default connectDb;