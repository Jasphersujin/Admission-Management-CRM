import mongoose from "mongoose";

const rolePermissionSchema = new mongoose.Schema(
  {
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true
    },

    screenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screen",
      required: true
    },

    actions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Action"
      }
    ]
  },
  {
    timestamps: true
  }
);

const RolePermission = mongoose.model("RolePermission", rolePermissionSchema );

export default RolePermission;