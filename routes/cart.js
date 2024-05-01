import express from "express"
const router = express.Router()
import { verifyTokenAndAdmin,verifyToken, verifyTokenAndAuthorization } from "./verifyToken.js"
import Cart from "../models/Cart.js"



// CREATE
router.post("/", verifyToken, async (req, res) => {
    // An object is created
    // New Keyword is used to create a object before a constructor function
    // Product() is a constructor function
    // Which is requesting everything in the body
    const newCart = new Cart(req.body);
    try {
        // save() method saves the the document
        const savedCart = await newCart.save();
        // sending response of saved product
        res.status(200).json(savedCart);
    } catch (error) {
        // sending error response
        res.status(500).json(error);
    }
})





// getting product id and importing token verification method
// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    try {
        // Setting Updated User 
        // Using MongoDB function to find the user and update it
        // taking user id through params 
        // setting which values to set
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            // To set everything in the body 
            // we use $set and get everything inside body using request.body
            $set: req.body
            // to get the updated user we user new: true
        }, { new: true })
        // getting the response of the updated user
        res.status(200).json(updatedCart)
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
        await Cart.findByIdAndDelete(req.params.id)
        // response status
        res.status(200).json("Cart has been Deleted...")
    } catch (error) {
        // sending error response
        res.status(500).json(error)
    }
})



// GET USER CART
router.get("/find/:id",verifyTokenAndAuthorization, async (req, res) => {
    try {
        // product variables stores the user by using function find by id
        const cart = await Cart.findOne({userId: req.params.userId})
        res.status(200).json(cart);
    } catch (error) {
        // sending error response
        res.status(500).json(error)
    }
})


// GET ALL
router.get("/",verifyTokenAndAdmin,async (req,res)=>{
try {
    const carts = await Cart.find()
    res.status(200).json(carts)
} catch (error) {
    res.status(500).json(error)
}
})






export default router;