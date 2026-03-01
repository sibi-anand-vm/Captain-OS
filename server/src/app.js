const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const app=express();
dotenv.config()

const connectDB=require("./config/DBConnector")
const errorHandler=require("./middleware/errorHandler")
const userRoutes=require("./routes/userRoutes")

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))
app.use(express.json())

let PORT=process.env.PORT || 5000;

connectDB();

app.use("/api/users",userRoutes);

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server Listening on ${PORT}`);
}) 