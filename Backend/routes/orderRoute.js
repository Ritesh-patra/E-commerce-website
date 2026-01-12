import { placeOrder, placeOrderStripe, placeOrderRazorPay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorPay } from "../controllers/orderController.js"
import { Router } from "express"
import { verifyTokken } from "../middlewares/auth.js"
import adminAuth from "../middlewares/adminAuth.js"
import wrapAsync from "../utils/asyncWrap.js"

const orderRouter = Router();
// For Admin
orderRouter.post('/list', adminAuth,wrapAsync(allOrders));
orderRouter.put('/status', adminAuth,wrapAsync(updateStatus)); 

// For users 
orderRouter.post('/place',verifyTokken,wrapAsync(placeOrder));
orderRouter.post('/stripe',verifyTokken,wrapAsync(placeOrderStripe));
orderRouter.post('/razor',verifyTokken,wrapAsync(placeOrderRazorPay));
orderRouter.get('/user/list',verifyTokken,wrapAsync(userOrders));

// verifyStripe
orderRouter.put('/verifyStripe',verifyTokken,wrapAsync(verifyStripe))
// verifyRazorPay
orderRouter.post('/razor/verify', verifyTokken, wrapAsync(verifyRazorPay));

export default orderRouter;   

 