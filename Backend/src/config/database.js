const mongoose=require("mongoose");

async function connectToDb() {
    await mongoose.connect(process.env.URL)
    .then(()=>console.log("Mongo Connected"))
}

module.exports=connectToDb