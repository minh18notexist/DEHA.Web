import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/User.js";

dotenv.config();

const createUser = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const existingUser = await User.findOne({ employeeId: "A001" });
  if (existingUser) {
    console.log("⚠️ User A001 đã tồn tại.");
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const newUser = new User({
    employeeId: "A001",
    password: hashedPassword,
    email: "admin@example.com",
    isAdmin: true
  });

  await newUser.save();
  console.log("Tạo user A001 thành công với mật khẩu 'admin123'");

  await mongoose.disconnect();
};

createUser();
