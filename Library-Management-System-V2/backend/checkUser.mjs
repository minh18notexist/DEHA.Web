import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import bcrypt from "bcrypt";

dotenv.config();

const check = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const user = await User.findOne({ employeeId: "A001" });

  if (!user) {
    console.log("❌ Không tìm thấy user A001");
  } else {
    const isMatch = await bcrypt.compare("admin123", user.password);
    console.log("✅ User found:", {
      employeeId: user.employeeId,
      email: user.email,
      isAdmin: user.isAdmin,
      passwordMatch: isMatch
    });
  }

  mongoose.disconnect();
};

check();
