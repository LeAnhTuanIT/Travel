import mongoose, { Document, Model, Schema } from "mongoose";

export interface TourDocument extends Document {
  name: string;
  country: string;
  description: string;
  destination: string;
  aim: string;
  price?: number;
  color: string;
  images: string[];
  userId: any;
  user: object;
  sold_out?: number;
  createAt: Date;
}

export interface TourModel extends Model<TourDocument> {}

const tourSchema = new Schema<TourDocument, TourModel>({
  name: {
    type: String,
    required: [true, "Please enter your tour name"],
  },
  country: {
    type: String,
    required: [true, "Please enter your tour place"],
  },
  description: {
    type: String,
    required: [true, "Please enter your tour description"],
  },
  destination: {
    type: String,
    required: [true, "Please enter your tour destination"],
  },
  aim: {
    type: String,
    required: [true, "Please enter your tour aim"],
  },
  price: {
    type: Number,
  },
  color: {
    type: String,
    required: [true, "Please enter your main color name"],
  },
  images: [
    {
      type: String,
    },
  ],
  userId: {
    type: String,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<TourDocument, TourModel>("Tour", tourSchema);


// export CRUD Tour