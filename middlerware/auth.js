const JWT = require('jsonwebtoken')

const verifytoken = (req,res,next)=>{
    const {token} =req.cookie.token

    if(!token){
        res.status(400).json({mes:"token is not created"})
    }

    JWT.verify(token,process.env.JWT_SECRET,(err,decrypt)=>{
        if(err){
            return res.status(400).json({mes:"token verify faild"})
        }

        req.user = decrypt.user
        next()
    })
}

module.exports = verifytoken