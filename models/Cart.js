import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    userId:
    {
        type: String,
        required: true,
        // Unique is used so we cannot make another same username
        unique: true
    },
    products: [
        {
            productId: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]



}, { timestamps: true })


export default mongoose.model("Cart", cartSchema)
