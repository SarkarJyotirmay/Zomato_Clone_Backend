import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import UserRouter from "./routes/user.routes.js"
import statelessAuthRouter from "./routes/statelessAuth.routes.js"
import { auth } from "./middlewares/auth.middleware.js"
import { v2 as cloudinary } from 'cloudinary';
import RestaurantRouter from "./routes/restaurant.routes.js"
import CartRouter from "./routes/cart.routes.js"
import OrderModel from "./model/order.model.js"
import OrderRouter from "./routes/order.routes.js"
import PaymentRouter from "./routes/payment.routes.js"

dotenv.config()

const app = express();

// mongo db
mongoose
  .connect(process.env.ATLAS_CONNECTION_STRING)
  .then(() => console.log(`DB Connected successfully`))
  .catch((err) => console.log(`DB Connection Error, ${err}`));


// cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
 
app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN, // your frontend URL
}))

console.log(process.env.FRONTEND_ORIGIN);


// routes
app.use("/api/v1/user", UserRouter)
app.use("/api/v1/auth",auth, statelessAuthRouter)
app.use("/api/v1/restaurant", auth, RestaurantRouter)
app.use("/api/v1/cart", auth, CartRouter)
app.use("/api/v1/order", auth, OrderRouter)
app.use("/api/v1/payment", auth, PaymentRouter)


const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log("Server is up and runnning"));
 