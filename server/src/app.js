const express=require("express")
const dotenv=require("dotenv")
const app=express();
dotenv.config()

const connectDB=require("./config/DBConnector")
const errorHandler=require("./middleware/errorHandler")
const userRoutes=require("./routes/userRoutes")

app.use(express.json())

let PORT=process.env.PORT || 5000;

connectDB();

app.use("/api/users",userRoutes);

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server Listening on ${PORT}`);
}) 