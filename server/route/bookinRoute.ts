import express from "express";
import { auth } from "../middleware/auth.js";
import { cancelBooking, checkout, shopBookings, userBookings } from "../controller/bookingController.js";


const bookingRouter = express.Router();

bookingRouter.post("/checkout", auth, checkout);
bookingRouter.get("/user", auth, userBookings);
bookingRouter.get("/shop", auth, shopBookings);
bookingRouter.patch("/cancel/:itemId", auth, cancelBooking);

export default bookingRouter
