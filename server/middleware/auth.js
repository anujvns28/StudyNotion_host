const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth
exports.auth = async (req, res, next) => {
    try {
        //  fetch token
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorization").replace("Bearer ", "");

        // token vallidation
        if (!token) {
            return res.status(500).json({
                success: false,
                message: 'token is missing',
            });
        }
        // decode token and add in req.body

        try {
            const decode = jwt.decode(token, process.env.JWT_SERCET);
          
            req.user = decode;
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'token is invallied',
            });
        }
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while validating the token',
        });
    }
}
// ______________________----------------------------------___________________________

// isStudent

exports.isStudent = async (req,res,next)=>{
try{
if(req.user.accountType !== "Student"){
    return res.status(401).json({
        success:false,
        message:"this is protuceted routes for studnts"
    })
}

next();

}catch(error){
    return res.status(500).json({
        success:false,
        message:'User role cannot be verified, please try again'
    })
}
}

// isInsturstor
exports.isInstructor = async (req,res,next)=>{
    try{
    if(req.user.accountType !== "Instructor"){
        return res.status(401).json({
            success:false,
            message:"this is protuceted routes for Instructor"
        })
    }
    
    next();
    
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
        })
    }
    }

// isAdmin

exports.isAdmin = async (req,res,next)=>{
    try{
    if(req.user.accountType !== "Admin"){
        return res.status(401).json({
            success:false,
            message:"this is protuceted routes for Admin"
        })
    }
    
    next();
    
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
        })
    }
    }