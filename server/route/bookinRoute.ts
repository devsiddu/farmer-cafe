import express from "express";
import { auth } from "../middleware/auth.js";
import { checkout, userBookings } from "../controller/bookingController.js";


const bookingRouter = express.Router();

bookingRouter.post("/", auth, checkout);
bookingRouter.get("/user", auth, userBookings);

export default bookingRouter
