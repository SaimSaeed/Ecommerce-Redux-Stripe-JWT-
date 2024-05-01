import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId:
    {
        type: String,
        required: true,
        // Unique attribute is added to keep in check that  we do not make another same username
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
    ],
    amount: {type: Number, required: true},
    // Address is taking object so that it can specify or filter data precisely
    address: {type: Object,required: true},
    status:{type:String,default:'pending'}



}, { timestamps: true })



export default mongoose.model("Order",orderSchema)
