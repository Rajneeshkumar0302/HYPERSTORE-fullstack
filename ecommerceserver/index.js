import dotenv from "dotenv";
dotenv.config();

import express from 'express'    
import mongoose from "mongoose";
import cors from "cors"
import Product from "./models/Productmodel.js";
import authRoutes from "./Routes/authRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import productRoutes from "./Routes/ProductRoutes.js";
// ===== CONFIG =====
const app = express();
const PORT =process.env.PORT || 3000;
// ===== MIDDLEWARE =====
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,  }));
   
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== MongoDB Connection ====
mongoose.connect(process.env.MONGO_URI,
 {useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// ===== ROUTES =====
//  routes once
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/products",productRoutes);

// app.post('/api/categories', async (req,res)=>{
//   try {
//     const savedItem = await Categories.create(req.body); // Save to MongoDB           
//     res.json(savedItem);
//   } catch(err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT} `)     
})
