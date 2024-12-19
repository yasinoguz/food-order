import mongoose from "mongoose";
import { string } from "yup";

const cateschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
  },
  { timestamps: true }
);
export default mongoose.models.category ||
  mongoose.model("category", cateschema);
