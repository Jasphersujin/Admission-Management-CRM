import mongoose from "mongoose";

const screenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    code: {
      type: String,
      required: true,
      unique: true
    },

    featureId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feature",
      required: true
    },

    route: {
      type: String,
      required: true
    },

    isDefault: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Screen = mongoose.model("Screen", screenSchema);

export default Screen; 