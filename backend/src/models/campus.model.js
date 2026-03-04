import mongoose from "mongoose";

const campusSchema = new mongoose.Schema(
  {
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Campus = mongoose.model("Campus", campusSchema);

export default Campus;