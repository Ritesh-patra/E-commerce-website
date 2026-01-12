import Order from "../model/orderModel.js";
import Cart from "../model/cartModel.js";
import httpStatus from "http-status"
import Stripe from "stripe"
import Razorpay from "razorpay";
import crypto from "crypto"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const currency = 'inr';

// placing order cod
const placeOrder = async (req,res) => {
    let { paymentMode, formData, shipping_fee } = req.body;
    let userId = req.user.id;
    let userCart =await Cart.findOne({ userId }).populate('item.productId');
    console.log("placeOrder1-userCart",userCart);
    console.log("placeOrder2-userCart",userCart.item);
    let orderItems = userCart.item.map((item) =>({
        productId: item.productId._id,
        name: item.productId.name,
        description: item.productId.description,  
        price: item.productId.price,
        image: item.productId.image,
        category: item.productId.category,
        subCategory: item.productId.subCategory,
        size: item.size,
        quantity: item.quantity,
    }));
    
    if(!userCart) {
        return res.status(httpStatus.NOT_FOUND).json({error: "Cart not found!"});
    }   

    if(userCart.item.length === 0){
        return res.status(httpStatus.NOT_FOUND).json({error: "There is no item in cart"})
    }   
     
    if(!paymentMode || !formData || !shipping_fee){
        return res.status(httpStatus.NOT_FOUND).json({error: "Please provide the all dettails"});
    }
    const totalAmount = userCart.item.reduce((acc,curr) => acc + curr.price * curr.quantity ,0) + shipping_fee;
    // console.log(totalAmount); 
 
    let orderDettails =new Order({
        userId,
        items: orderItems,
        address: formData,
        amount: totalAmount, 
        paymentMode: paymentMode,
        payment: false,
        date: Date.now(),
    });
    console.log("placeOrder1-orderDettails1",orderDettails);
    console.log("placeOrder1-orderDettails2",orderDettails.items);
    await orderDettails.save();
    await Cart.findOneAndUpdate({userId},{item:[]});
    res.json({message: "Order Placed Successfully!"});
}

// placing order stripe
const placeOrderStripe = async (req, res) => { 
    let { paymentMode, cartItems, formData, shipping_fee } = req.body;
    let { origin } = req.headers;

    // console.log(cartItems);

    if (cartItems.length === 0) {
        return res.status(httpStatus.NOT_FOUND).json({ error: "There is no item in cart" });
    }

    if (!paymentMode || !formData || shipping_fee === undefined || shipping_fee === null) {
        return res.status(httpStatus.NOT_FOUND).json({ error: "Please provide the all dettails" });
    }

    let orderItems = cartItems.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        description: item.productId.description,
        price: item.productId.price,
        image: item.productId.image,
        category: item.productId.category,
        subCategory: item.productId.subCategory,
        size: item.size,
        quantity: item.quantity,
    }));

    const totalAmount = cartItems.reduce((acc,curr) => acc + curr.price * curr.quantity ,0) + shipping_fee;
    
    let newOrder = new Order({
        userId: req.user.id,
        items: orderItems,
        address: formData,
        amount: totalAmount,
        paymentMode: paymentMode,
        payment: false,
        date: Date.now(),
    });

    await newOrder.save();

    const line_items = cartItems.map((item) => ({
        price_data: {
            currency,
            product_data: {
                name: item.productId.name,
            },
            unit_amount: item.price * 100,
        },
        quantity: item.quantity,
    }));

    line_items.push({
        price_data: {
            currency,
            product_data: {
                name: "Delivery Charges",
            },
            unit_amount: shipping_fee * 100,
        },
        quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
        success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode: 'payment',
    });

    console.log("sesion",session,"-----");

    res.json({ success: true,session_url: session.url})

    // await Cart.findOneAndUpdate({userId},{item:[]});
    // console.log(cartItems);

};

// const stripeWebhook = async (req, res) => {
//     const sig = req.headers['stripe-signature'];

//     let userId =req.user.id;
//     console.log("userId",userId);

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         sig,
//         process.env.STRIPE_WEBHOOK_SECRET
//       );
//     } catch (err) {
//       console.log("❌ Webhook Signature Error", err);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;

//       const orderId = session.success_url.split("orderId=")[1];

//       await Order.findByIdAndUpdate(orderId, { payment: true });

//       const order = await Order.findById(orderId);
//       let cart = await Cart.findOneAndUpdate({ userId }, { item: [] });
//       console.log("verifyStripe",order,"------------",cart);

//       console.log("💰 Payment Verified and Cart Cleared");
//     }

//     res.status(200).send("OK");
//   }

const verifyStripe =async (req,res) => {
    let { orderId, success } = req.body;
    let userId =req.user.id;
    if(success === 'true') {
        let order=await Order.findByIdAndUpdate(orderId ,{payment: true});
        let cart=await Cart.findOneAndUpdate({ userId } ,{ item: [] });
        // console.log("verifyStripe",order,"------------",cart);
        res.json({ success: true });
    } else {
        console.log(orderId);
        let order=await Order.findByIdAndDelete(orderId,{ new: true});
        // console.log(order);
        res.json({ success: false });
    }
}



// placing order razor pay
const placeOrderRazorPay = async (req,res) => {
    let { cartItems, formData, shipping_fee } = req.body;
    // let { origin } = req.headers;

    // console.log(cartItems);

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ error: "Your cart is empty" });
    }

    if (!formData) {
        return res.status(400).json({ error: "Address details required" });
    }

    if (shipping_fee === undefined || shipping_fee === null) {
        return res.status(400).json({ error: "Shipping fee missing" });
    }

    let orderItems = cartItems.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        description: item.productId.description,
        price: item.productId.price,
        image: item.productId.image,
        category: item.productId.category,
        subCategory: item.productId.subCategory,
        size: item.size,
        quantity: item.quantity,
    }));

    // console.log(cartItems);

    const totalAmount = cartItems.reduce((acc,curr) => acc + curr.price * curr.quantity ,0) + shipping_fee;
    // console.log("2",totalAmount,"----")

    let newOrder = await Order.create({
        userId: req.user.id,
        items: orderItems,
        address: formData,
        amount: totalAmount,
        paymentMode: "razorpay",
        payment: false,
        date: Date.now(),
    });


    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: newOrder._id.toString(),
    }

    const razorOrder = await razorpay.orders.create(options);

    // await razorpayInstance.orders.create(options,(error,order) => {
    //     if(error) {
    //         console.log(error);
    //         return res.json({success: false, message: error})
    //     }
    //     res.json({success: true,order})
    // })
    return res.json({
      success: true,
      orderId: newOrder._id,
      amount: totalAmount,
      razorOrder,
      key: process.env.RAZORPAY_KEY_ID,
    });
}

const verifyRazorPay = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } =
    req.body;

  const bodyString = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(bodyString)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.json({ success: false, error: "Signature verification failed" });
  }

  // Update order as paid
  await Order.findByIdAndUpdate(orderId, { payment: true });

  const order = await Order.findById(orderId);

  // Clear cart (your schema uses item: [])
  await Cart.updateOne(
    { userId: order.userId },
    { $set: { item: [] } }
  );

  return res.json({ success: true });
};

//All order data for admin panel
const allOrders = async (req,res) => {
    let ordersData =await Order.find({});
    console.log(ordersData);
    if(!ordersData) {
        return res.status(httpStatus.NOT_FOUND).json({error: "ordersData not found"});
    }
    res.json(ordersData);
} 
 

//All order data for frontend
const userOrders = async (req,res) => {
    let userId = req.user.id;
    console.log("userId",userId);
    let userOrdersData =await Order.find({ userId });
    if(!userOrdersData || userOrdersData.length === 0) {
        return res.status(httpStatus.NOT_FOUND).json({error: 'You have not ordered yet!'});
    }
    console.log("userOrdersData",userOrdersData);
    console.log("userOrdersData.items",userOrdersData[0].items);
    res.json(userOrdersData);
} 

const updateStatus = async (req,res) => {
    let { orderId, status } = req.body;
    let orderData = await Order.findByIdAndUpdate(orderId,{status});
    res.json(orderData);
}

export { placeOrder, placeOrderStripe, placeOrderRazorPay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorPay }