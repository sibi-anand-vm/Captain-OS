const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const app=express();
dotenv.config()

const connectDB=require("./config/DBConnector")
const errorHandler=require("./middleware/errorHandler")
const userRoutes=require("./routes/userRoutes")

// CORS configuration – required when frontend (e.g. Vercel) and backend (e.g. Render) are on different origins.
// Set FRONTEND_URL on Render to your Vercel URL with no trailing slash, e.g. https://your-app.vercel.app
const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((url) => url.trim().replace(/\/$/, ''))
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // Allow requests with no origin (e.g. Postman, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.length === 0 || !allowedOrigins.includes(origin)) return callback(null, false);
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json())

let PORT=process.env.PORT || 5000;

connectDB();

app.use("/api/users",userRoutes);

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server Listening on ${PORT}`);
}) 