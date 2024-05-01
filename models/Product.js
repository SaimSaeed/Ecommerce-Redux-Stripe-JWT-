import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: true,
        // Unique is used so we cannot make another same username
        unique: true
    },
    desc:{
        type:String,
        required : true,
        unique: true
    },
    img:{
        type: String,
        required: true
    },
    categories:{
        type: Array
    },
    size:{
        type:Array,
        required: true
    },
    color:{
        type: Array,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    inStock:{
        type:Boolean,
        default:true
    }
    // ,
    // createdAt:Date.now()


},{timestamps:true})


export default mongoose.model("Product",productSchema)
