const mongoose = require ('mongoose')

const connectDb = async()=>{

    try{
        (await mongoose.connect(process.env.MONGO_URL))
            console.log("Db is connect ")
        
    }catch(err){
        return res.status(400).json({mes:"not connect database"})
        process.exit(1)
    }
}

module.exports = connectDb