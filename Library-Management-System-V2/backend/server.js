import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import bookRoutes from "./routes/books.js";
import transactionRoutes from "./routes/transactions.js";
import categoryRoutes from "./routes/categories.js";

import User from "./models/User.js";
import Category from "./models/BookCategory.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

// Hàm tạo admin mặc định
const seedAdmin = async () => {
  const existingAdmin = await User.findOne({ email: "admin@library.com" });
  if (!existingAdmin) {
    const hashedPass = await bcrypt.hash("admin123", 10);
    const admin = new User({
      userType: "admin",
      userFullName: "Admin User",
      employeeId: "A001",
      age: 30,
      gender: "Male",
      email: "admin@library.com",
      password: hashedPass,
      mobileNumber: 123456789,
      isAdmin: true,
    });
    await admin.save();
    console.log("✅ Admin user created successfully.");
  } else {
    console.log("ℹ️ Admin user already exists.");
  }
};

// Hàm tạo danh mục mặc định
const seedDefaultCategories = async () => {
  await Category.deleteMany({ categoryName: null }); // Xóa dữ liệu lỗi nếu có
  const existing = await Category.find();
  if (existing.length === 0) {
    await Category.insertMany([
      { categoryName: "Khoa học" },
      { categoryName: "Công nghê" },
      { categoryName: "Hội họa"},
      { categoryName: "Văn học"},
      { categoryName: "Lịch sử" },
    ]);
    console.log("✅ Default categories seeded.");
  } else {
    console.log("ℹ️ Categories already exist.");
  }
};

// Kết nối MongoDB và khởi động các seed
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
        console.log("✅ MongoDB connected");

    await seedAdmin();
    await seedDefaultCategories();

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

// Kết nối DB
connectDB();

// Default route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to LibraryApp");
});

// Khởi động server
app.listen(port, () => {
  console.log(`🚀 Server is running in PORT ${port}`);
});
