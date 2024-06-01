import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";
import cartRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("DB Connection Successful");
}).catch((error) => {
  console.error("Error connecting to the database:", error);
  process.exit(1); // Exit the process if unable to connect to the database
});

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
  console.error("Error starting server:", err);
});
