import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const seedRootAdmin = async () => {
  try {

    const exists = await User.findOne({ role: "ADMIN" });

    if (exists) {
      console.log("Root admin already exists");
      return;
    }

    const password = await bcrypt.hash("root123", 10);

    await User.create({
      name: "Institute Owner",
      email: "institute@admin.com",
      password,
      role: "ADMIN"
    });

    console.log("Root admin created");

  } catch (err) {
    console.error(err);
  }
};