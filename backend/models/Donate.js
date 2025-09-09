import mongoose from "mongoose";

const donateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: String },
    message: { type: String },
    foodItems: [
      {
        type: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { versionKey: false } // Optional: Removes __v if not needed
);

const Donate = mongoose.model("Donate", donateSchema);

export default Donate;
