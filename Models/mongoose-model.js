const e=require('express');
let mongoose=require('mongoose');


let strawBoySchema= mongoose.Schema({

    name:{
        type:String,            // value type
        required:true
    },

      email:{
        type:String,            // value type
        required:true,
        unique:true             // to make emailunique
    },

      phone:{
        type:Number,            // value type
        required:true,
        unique:true
    },

      nickname:{
        type:String,            // value type
        required:true
    }
});

let mongooseModel=mongoose.model("Mugiwara",strawBoySchema)  // Mugiwara is a table name 

module.exports=mongooseModel;