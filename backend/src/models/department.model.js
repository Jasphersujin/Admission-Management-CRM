import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    campusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campus",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Department = mongoose.model("Department", departmentSchema);

export default Department;