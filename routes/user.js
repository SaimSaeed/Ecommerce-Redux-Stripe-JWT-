import express, { json } from "express"
const router = express.Router()
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "./verifyToken.js"
import CryptoJS from "crypto-js"
import User from "../models/User.js"


// getting user id and importing token verification method
// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    // Checking password so that user can change password
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()

    }

    try {
        // Setting Updated User 
        // Using MongoDB function to find the user and update it
        // taking user id through params 
        // setting which values to set
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            // To set everything in the body 
            // we use $set and get everything inside body using request.body
            $set: req.body
            // to get the updated user we user new: true
        }, { new: true })
        // getting the response of the updated user
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE
// delete method is used
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        // monogoDb Function is used
        // Id is requested from params
        await User.findByIdAndDelete(req.params.id)
        // response status
        res.status(200).json("User has been Deleted...")
    } catch (error) {
        // sending error response
        res.status(500).json(error)
    }
})



// GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        // user variables stores the user by using function find by id
        const user = await User.findById(req.params.id)
        //   password is extracted from the user so that it does not show
        const { password, ...others } = user._doc;
        // rest of the data is sent excluding password
        res.status(200).json({ others });
    } catch (error) {
        // sending error response
        res.status(500).json(error)
    }
})


// GET ALL USERS
// and with query users?new=true on postman we can see the newly registered users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    // requesting our query named new
    const query =  req.query.new;
    try {
        // user variables stores the user by using function find
        // using query to return the latest user
        const users =query ? await User.find().sort({_id:-1}).limit(1): await User.find()
        // getting all the users
        res.status(200).json(users);
    } catch (error) {
        // sending error response
        res.status(500).json(error)
    }
})


// GET USER STATS

router.get("/stats",verifyTokenAndAdmin,async(req,res)=>{
    // getting date
    const date = new Date();
    // getting Year
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1))
    try {
        // agregates function is used to perform operations on index
        // accessing the user the user model and performing functions
        const data = await User.aggregate([
            // 
            {
                // match show those document which fulfil the conditions
                // like in this code the condition is it should be greater than the date of last year
                $match:{createdAt:{$gte:lastYear}}

            },
            {
                // project query in mongodb is used to reshape a document by adding or removing fields
                // it can also be used to create sub documents or create compund values
                $project:{
                    // month is taking a value of createdAt
                    month:{$month:"$createdAt"}
                }
            },
            {
                // Group seperates documents according to group key
                // here the key is id
                $group: {
                    // id 
                    _id:"$month",
                    // its going to sum every registered user
                    total:{$sum:1}
                }
            }
        ])
        res.status(200).json(data);
        
    } catch (error) {
        // Error status
        res.status(500).json(error)
    }
})











export default router;
