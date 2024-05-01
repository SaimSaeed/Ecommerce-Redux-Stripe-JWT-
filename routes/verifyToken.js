import jwt  from "jsonwebtoken";


// Verify Token is method to verify the token that is created 
// next is a middleware
const verifyToken = (req,res,next)=>{
    // authHeader takes value of token in the headers
    const authHeader = req.headers.token;
    // if authHeader exists
if(authHeader){

    const token  = authHeader.split(" ")[1];
    // jwt method to which takes in token and secret key
jwt.verify(token,process.env.JWT_SEC,(error,user)=>{
if(error)  return res.status(403).json("Token is not valid!");
// requesting user
req.user = user;
// using callback
next();
   
})

}else{
    // status code to return not authenticated
    return res.status(401).json("You are not authenticated!");
}



}

// Token validation and authentication validation
// Next is a middle ware
const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        // if the requested user id is equal to the param id which is given
        // or user is admin
        if(req.user.id === req.params.id || req.user.isAdmin){
        next()

        }
        else{
            res.status(403).json("You are not allowed to do that!")
        }
        })
}



const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        // if the requested user id is equal to the param id which is given
        // or user is admin
        if(req.user.isAdmin){
        next()

        }
        else{
            res.status(403).json("You are not allowed to do that!")
        }
        })
}


export {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin};



