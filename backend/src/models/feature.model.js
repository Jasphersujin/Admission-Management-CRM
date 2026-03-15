import mongoose from "mongoose";

const featureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SidebarSection",
      required: true
    },

    icon: {
      type: String,
      default: null
    },

    order: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Feature = mongoose.model("Feature", featureSchema);

export default Feature;