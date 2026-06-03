import mongoose, { Schema } from "mongoose";

type EventDocument = mongoose.Document & {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const normalizeDate = (value: string): string => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error("Invalid date format");
  }
  return parsed.toISOString();
};

const normalizeTime = (value: string): string => {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (!match) {
    throw new Error("Invalid time format");
  }
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error("Invalid time value");
  }
  return `${hours.toString().padStart(2, "0")}:${match[2]}`;
};

const eventSchema = new Schema<EventDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    mode: { type: String, required: true, trim: true },
    audience: { type: String, required: true, trim: true },
    agenda: {
      type: [String],
      required: true,
      validate: {
        validator: (items: string[]) => items.length > 0 && items.every((item) => item.trim().length > 0),
        message: "Agenda must contain at least one item",
      },
    },
    organizer: { type: String, required: true, trim: true },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: (items: string[]) => items.length > 0 && items.every((item) => item.trim().length > 0),
        message: "Tags must contain at least one item",
      },
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.index({ slug: 1 }, { unique: true });

// Normalize slug, date, and time before persisting changes.
eventSchema.pre("save", function preSave(next) {
  const requiredStrings = [
    this.title,
    this.description,
    this.overview,
    this.image,
    this.venue,
    this.location,
    this.date,
    this.time,
    this.mode,
    this.audience,
    this.organizer,
  ];

  if (requiredStrings.some((value) => value.trim().length === 0)) {
    return next(new Error("Required fields must be non-empty"));
  }

  if (this.isModified("title")) {
    // Regenerate the slug only when the title changes.
    this.slug = slugify(this.title);
  }

  this.date = normalizeDate(this.date);
  this.time = normalizeTime(this.time);

  return next();
});

export const Event = mongoose.models.Event || mongoose.model<EventDocument>("Event", eventSchema);
