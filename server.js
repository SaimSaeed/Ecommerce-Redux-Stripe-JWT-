// require should not be used in ES6 it should only be used in ES5
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
// Routes are defined and imported in ES6, not required like in ES5
import userRoute from "./routes/user.js"
import authRoute from "./routes/auth.js"
import productRoute from "./routes/product.js"
import cartRoute from "./routes/cart.js"
import orderRoute from "./routes/order.js"






const app = express()

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB Connnection Successful");
}).catch((error)=>{
    console.log(error)
})
// express.json is required to show your json data on a webpage
app.use(express.json())
// Creating Routes
app.use("/api/auth",cors(),authRoute)
app.use("/api/users",cors(),userRoute)
app.use("/api/products",cors(),productRoute)
app.use("/api/carts",cors(),cartRoute)
app.use("/api/orders",cors(),orderRoute)



const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log("Server is Running!")
})