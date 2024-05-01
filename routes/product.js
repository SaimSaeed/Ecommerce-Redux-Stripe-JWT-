import express from "express"
const router = express.Router()
import { verifyTokenAndAdmin} from "./verifyToken.js"
import Product from "../models/Product.js"



// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    // An object is created
    // New Keyword is used to create a object before a constructor function
    // Product() is a constructor function
    // Which is requesting everything in the body
    const newProduct = new Product(req.body);
    try {
        // save() method saves the the document
        const savedProduct = await newProduct.save();
        // sending response of saved product
        res.status(200).json(savedProduct);
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
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            // To set everything in the body 
            // we use $set and get everything inside body using request.body
            $set: req.body
            // to get the updated user we user new: true
        }, { new: true })
        // getting the response of the updated user
        res.status(200).json(updatedProduct)
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
        await Product.findByIdAndDelete(req.params.id)
        // response status
        res.status(200).json("Product has been Deleted...")
    } catch (error) {
        // sending error response
        res.status(500).json(error)
    }
})



// GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
        // product variables stores the user by using function find by id
        const product = await Product.findById(req.params.id)
        res.status(200).json(product);
    } catch (error) {
        // sending error response
        res.status(500).json(error)
    }
})


// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    // requesting our query named new
    // Two Queries are defined
    // This Query is used to request the newest product
    const qNew = req.query.new;
    // This Query is used to request the products by categories
    const qCategory = req.query.category;
    // Using Try Catch
    try {
        // Defined a variable products
        let products;
        // Setting Conditions
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1)
        }
        else if (qCategory) {
            // Query to find the products by category 
            // categories have array this query will find the items stored in categories
            // and show them 
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                }
            })
        }
        else {
            // Getting all the products
             products = await Product.find()
             
        }
        // Getting products response
        res.status(200).json(products)
    }
    catch (error) {
        // Error response
        res.status(500).json(error)
    }
})



export default router;