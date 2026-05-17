import express from "express";

import {
  createBooking,
  getBookings,
  updateBookingStatus,
  getBookedSlots
} from "../controllers/bookingController.js";

const router =
  express.Router();

router.post(
  "/",
  createBooking
);

router.get(
  "/expert/:id",
  getBookedSlots
);

router.get(
  "/",
  getBookings
);

router.patch(
  "/:id/status",
  updateBookingStatus
);

export default router;