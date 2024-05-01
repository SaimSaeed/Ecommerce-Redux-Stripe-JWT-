import express from "express"
const router = express.Router()
import { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } from "./verifyToken.js"
import Order from "../models/Order.js"



// CREATE
router.post("/", verifyToken, async (req, res) => {
    // An object is created
    // New Keyword is used to create a object before a constructor function
    // Product() is a constructor function
    // Which is requesting everything in the body
    const newOrder = new Order(req.body);
    try {
        // save() method saves the the document
        const savedOrder = await newOrder.save();
        // sending response of saved product
        res.status(200).json(savedOrder);
    } catch (error) {
        // sending error response
        res.status(500).json(error);
    }
})





// getting product id and importing token verification method
// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        // Setting Updated User 
        // Using MongoDB function to find the user and update it
        // taking user id through params 
        // setting which values to set
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            // To set everything in the body 
            // we use $set and get everything inside body using request.body
            $set: req.body
            // to get the updated user we user new: true
        }, { new: true })
        // getting the response of the updated user
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})


// DELETE
// delete method is used
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        // monogoDb Function is used
        // Id is requested from params
        await Order.findByIdAndDelete(req.params.id)
        // response status
        res.status(200).json("Order has been Deleted...")
    } catch (error) {
        // sending error response
        res.status(500).json(error)
    }
})



// GET USER ORDERS
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        // product variables stores the user by using function find by id
        const orders = await Order.find({ userId: req.params.userId })
        res.status(200).json(orders);
    } catch (error) {
        // sending error response
        res.status(500).json(error)
    }
})


// GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})


// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {

        const income = await Order.aggregate([
            {$match:{createdAt:{$gte:previousMonth}}},
            {
                $project:{
                    month:{$month:"$createdAt"},
                    sales: "$amount"
                }
               
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:"$sales"}
                }
            }
        ])

        res.status(200).json(income)

    } catch (error) {
res.status(500).json(error)
    }
})







export default router;