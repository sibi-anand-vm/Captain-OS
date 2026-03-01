const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const app=express();
dotenv.config()

const connectDB=require("./config/DBConnector")
const errorHandler=require("./middleware/errorHandler")
const userRoutes=require("./routes/userRoutes")

const isProd = process.env.NODE_ENV === 'production';
const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((url) => url.trim().replace(/\/$/, ''))
  .filter(Boolean);

// Local dev: allow localhost and 127.0.0.1 on any port (Vite default 5173, etc.)
const localOrigin = (origin) =>
  origin && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (!isProd && localOrigin(origin)) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(null, false);
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