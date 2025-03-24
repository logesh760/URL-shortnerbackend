const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken')

const registerNewuser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Request body:', req.body); 

    // Check if all required fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ mes: "Kindly fill in the details" });
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
        return res.status(400).json({ mes: "Already exists, please login" });
    }

    // Hash password before saving
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
        name,
        password: hashPassword,
        email
    });

    if (!user) {
        return res.status(400).json({ mes: "Could not create user" });
    }

    // Return success response
    return res.status(200).json({ id: user._id, email: user.email });
});

const loginUser =asyncHandler(async(req,res)=>{

    const {email,password} = req.body

    if(!email || !password){
        res.status(400).json({mes:"kindly send the details"})
    }
    const userExist = await User.findOne({ email })

    if(userExist && await bcrypt.compare(password,userExist.password)){

        const token = JWT.sign({

            user:{
                username:userExist.username,
                email:email,
                password:passward,
                id:userExist._id

            }
        },
    process.env.JWT_SECRET,
    {expiresIn:'1h'}
)
res.cookie('token',token,{
    httpOnly : true,
    secure: true,
    semeSite:'None',
})
res.status(200).json({token})


    }else{
        res.status(400).json({mes:"email and passward not valid"})
    }


})


const logoutUser = asyncHandler(async(req,res)=>{
    res.clearCookie('token',{path:'/'})
    res.status(200).json({mes:"successfully logout"})
})




module.exports = { registerNewuser,loginUser,logoutUser };
