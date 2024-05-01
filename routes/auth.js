import express from "express"
const router = express.Router()
import User from "../models/User.js"
import CryptoJS from "crypto-js"
// The Universal operator is used to access all the functions of the env package
import * as dotenv from "dotenv";
// Env config can also be used to in a variable and can also be used like this
dotenv.config();
// Importing JsonWebToken
import jwt from "jsonwebtoken"

// Register
router.post("/register", async (req, res) => {
    try {
        // User Object is Created to Store User Values from the Database 
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            // Password is encrypted by using CrytpoJS so that it remains encrypted and secure 
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),


        })
        // Save method is used to save the userData that has been fethced from the body
        // Create method can also be used to do the same thing.
        const savedUser = await newUser.save()
        // status 201 represents successfully added 
        // This expression takes a status and then using json function the savedUser data is displayed 
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }

})


// Login
router.post("/login", async (req, res) => {
    try {
        // findOne function is used to find a specific user that is register from the above api endpoint 
        // find and findById can also be used but every function has a specific purpose 
        const user = await User.findOne({
            // Username is requested from the body
            username: req.body.username,
        })
        // If there is no user then send response to page that the credentials are wrong.
        if (!user) {
            res.status(401).json("User Not Found!")
            return;
        }

        // Hashed paswword is decrypted
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const Orignalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if (Orignalpassword != req.body.password) {
            res.status(401).json("Wrong Credentials!")
            return;
        }

        // JWT Access Token
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },process.env.JWT_SEC,
        // Token expiry date
        {expiresIn:"3d"}
    )
// We are accessing the user object ans using spread operator to seperate the password from other data
// ._doc is used because mongoDB stores data in the _doc
// The goal here is to prevent the password from showing
        const {password, ...others} = user._doc;
        // Spreading others and using accesstoken and storing them in an object
        res.status(200).json({...others,accessToken})



    } catch (error) {
        // 500 is error status there are other error statuses as well but they are not used here
        res.sendStatus(500).json(error)
    }




})



// In ES6 module.exports is not used instead export default is used.
export default router;