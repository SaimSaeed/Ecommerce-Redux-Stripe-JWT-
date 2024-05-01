import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:
    {
        type: String,
        required: true,
        // Unique is used so we cannot make another same username
        unique: true
    },
    email:{
        type:String,
        required : true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
    // ,
    // createdAt:Date.now()














},{timestamps:true})


export default mongoose.model("User",userSchema)
