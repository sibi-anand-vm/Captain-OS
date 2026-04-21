const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const app=express();

dotenv.config()

const connectDB=require("./config/DBConnector")
const errorHandler=require("./middleware/errorHandler")
const authRoutes=require("./routes/authRoutes")
const taskRoutes=require("./routes/taskRoutes")
const leetcodeRoutes = require("./routes/leetcodeRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const interviewApplicationRoutes = require("./routes/interviewApplicationRoutes");
const validateToken = require("./middleware/validateToken");

const isProd = process.env.NODE_ENV === 'production';
const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((url) => url.trim().replace(/\/$/, ''))
  .filter(Boolean);

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

let PORT=process.env.PORT || 4008;

connectDB();


app.use("/api/health",(req,res)=>{
    res.json({status:"ok"})
});

app.use("/api/auth",authRoutes);
app.use("/api/tasks",validateToken,taskRoutes);
app.use("/api/leetcode",validateToken,leetcodeRoutes);
app.use("/api/resumes",validateToken, resumeRoutes);
app.use("/api/applications",validateToken, interviewApplicationRoutes);

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server Listening on ${PORT}`);
}) 