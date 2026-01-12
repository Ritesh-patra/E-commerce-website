import express from "express"
import { addProduct, singleProduct, removeProduct, showAllProducts } from "../controllers/productController.js";
import { upload } from "../middlewares/multer.js";
import wrapAsync from "../utils/asyncWrap.js";
import { verifyAdmin ,verifyTokken } from "../middlewares/auth.js";

const productRouter = express.Router();
// add Products
productRouter.post('/add',verifyTokken,upload.fields([{name:'image1', maxCount: 1},{name:'image2', maxCount: 1},{name:'image3', maxCount: 1},{name:'image4', maxCount: 1}]),wrapAsync(addProduct));

// remove Products
productRouter.delete('/remove/:id',verifyTokken,wrapAsync(removeProduct));

// showAll products  
productRouter.get('/list',wrapAsync(showAllProducts));
 
//  show single dettails product
productRouter.get('/dettails/:id',wrapAsync(singleProduct)); 
 
 
export default productRouter;       