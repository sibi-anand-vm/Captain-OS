const mongoose=require("mongoose")
const DBConnector=async()=>{
    try{
        const connector=await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to "+connector.connection.name+" DB");
    }
    catch(err){
        console.log("Error connecting to DB"+err.message);
    }
}
module.exports=DBConnector; 