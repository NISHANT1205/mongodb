let express=require('express');
var mongoose= require('mongoose');
const mongooseModel = require('./Models/mongoose-model');
require('dotenv').config();

let app=express();
app.use(express.json())

                                 // Connect mongoose

mongoose.connect(process.env.DBURL);

app.listen(process.env.PORT);
                                // View data
app.get('/api/view-data',async(req,res)=>{

    let viewData= await mongooseModel.find();
    res.send({
        msg:"All members",
        data:viewData
    })
})
                                // Insert data
app.post('/api/insert-data',(req,res)=>{

    let {sName, sEmail, sPhone, sNickname}=req.body;

    let member= new mongooseModel({
        name:sName,
        email:sEmail,
        phone:sPhone,
        nickname:sNickname
    });

    // member.save();
   member.save()
    .then(() => {
        res.send({ status: 1, msg: "Enquiry saved" });
    })
    .catch((err) => {
        res.send({ status: 0, msg: "Error in enquiry", error: err });
    });

})
   
                                         // Delete data using object id

app.delete('/api/delete-data/:id',async(req,res)=>{

    let objId= req.params.id;

    let deleteData= await mongooseModel.deleteOne({_id:objId});
    res.send({
        msg:"Deleted data",
        delRes:deleteData,
        id:objId

    })
})
                                           // Update data using object id
app.put('/api/update-data/:id',async(req,res)=>{

    let objId=req.params.id;

    let{sName, sEmail, sPhone, sNickname}=req.body;

    let updateObj= {
        name:sName,
        email:sEmail,
        phone:sPhone,
        nickname:sNickname
    };

    let updateEnquiry= await mongooseModel.updateOne({_id:objId},{$set: updateObj});

    res.send({
        message:"Data updated",
        updateRes: updateEnquiry
    })

})

app.get('/api',(req,res)=>{
    res.send("API")
})

