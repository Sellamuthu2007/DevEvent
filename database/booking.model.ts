import mongoose, { Schema } from "mongoose";

import { Event } from "./event.model";

type BookingDocument = mongoose.Document & {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookingSchema = new Schema<BookingDocument>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [emailRegex, "Invalid email address"],
    },
  },
  {
    timestamps: true,
  }
);

// Ensure the event exists before accepting a booking.
bookingSchema.pre("save", async function preSave() {
  if (!emailRegex.test(this.email)) {
    throw new Error("Invalid email address");
  }

  const exists = await Event.exists({ _id: this.eventId });
  if (!exists) {
    throw new Error("Event not found for booking");
  }
});

export const Booking =
  mongoose.models.Booking || mongoose.model<BookingDocument>("Booking", bookingSchema);
