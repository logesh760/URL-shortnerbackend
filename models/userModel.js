const mongoose = require('mongoose')

const usersechma = new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:[true,"Email already exist "]
        
    },
    password:{
        type:String,
        require:true
    }
})

const model = mongoose.model('user',usersechma)

module.exports= model