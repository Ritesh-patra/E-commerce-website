import express from "express"
import 'dotenv/config'
import connectDB from "./config/mongoDB.js";
import httpStatus from "http-status";
// import connectCloudinary from "./middlewares/cloudinary.js";
import cors from "cors"
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();
// connectCloudinary();
 
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: [
      "https://e-commerce-website-tau-pearl.vercel.app",
      "https://e-commerce-website-9fcj.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }));



app.use('/api/user', userRouter); 
app.use('/api/product', productRouter);  
app.use('/api/cart', cartRouter); 
app.use('/api/order', orderRouter);

app.use("/",(req,res)=>{
  res.send("Api is working");
})
 

app.use((err,req,res,next) => {
    // console.log("Error = ",err,"----}}}}}}}----");  
    let { status=400, message="Internal Server Error!" } = err;
    res.status(status).json({ error: message});
})

app.listen(4000,() => {
    console.log('Server is listening at port: ', + port);
})  