import mongoose, { Document, Model, Schema } from "mongoose";
export interface TourDocument extends Document {
  name: string;
  country: string,
  description: string,
  destination: string,
  aim: string,
  price?: number,
  images: string[],
  reviews: mongoose.Types.ObjectId[],
  user: object,
  sold_out?: number,
  createAt: Date,
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
    required:[true, "Plaese enter your tour price"],
  },
  images: [
    {
      type: String,
    },
  ],
  reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Review",
      required: true
   },
  ],
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
