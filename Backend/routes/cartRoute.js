import express from "express"
import { getAllCart, addToCart, removeToCart, updateToCart } from "../controllers/cartController.js";
import { verifyTokken } from "../middlewares/auth.js";
import wrapAsync from "../utils/asyncWrap.js";


const cartRouter = express.Router();

cartRouter.get('/list',verifyTokken,wrapAsync(getAllCart));      
 
cartRouter.post('/add',verifyTokken,wrapAsync(addToCart));

cartRouter.delete('/remove',verifyTokken,wrapAsync(removeToCart));

cartRouter.put('/update',verifyTokken,wrapAsync(updateToCart));
  
export default cartRouter;