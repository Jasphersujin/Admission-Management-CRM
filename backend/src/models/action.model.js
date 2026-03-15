import mongoose from "mongoose";

const actionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    code: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

const Action = mongoose.model("Action", actionSchema);

export default Action;