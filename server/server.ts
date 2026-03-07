import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import connectDb from "./config/db.js";
import userRouter from "./route/userRoute.js";
import shopRouter from "./route/shopRoute.js";
import adminRouter from "./route/adminRoute.js";

const app = express();

// connect to db
await connectDb();

const allowedOrigins = ["http://localhost:5173"]

// Middleware
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/admin", adminRouter);
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
