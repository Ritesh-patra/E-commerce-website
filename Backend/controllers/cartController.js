import User from "../model/userModel.js";
import Cart from "../model/cartModel.js"
import httpStatus from "http-status"


export const getAllCart = async (req,res) => {
    let userId = req.user.id;
    
    let userCartItems = await Cart.findOne({ userId }).populate('item.productId');
    if(!userCartItems) {
        return res.json([]);  
    }
    res.json(userCartItems.item);
} 

export const addToCart = async (req,res) => {  
    let { productId, size, quantity, price } = req.body;
    if (!productId || !size || !quantity || !price) {
      return res.status(400).json({ error: "Missing cart fields" });
    }

    let userId = req.user.id;  
 
    let userCart = await Cart.findOne({userId}); 
    if(!userCart) {
        let newCart = new Cart({
            userId,
            item: [{productId, size, quantity, price}]
        });
        await newCart.save();
        return res.status(httpStatus.OK).json({ message: "Item Added successfully"});
    }

    let existingItem = userCart.item.find((item) => item.size === size && item.productId.toString() === productId);

    if(existingItem) {
        existingItem.quantity += 1;
    } else {
        userCart.item.push({ productId, size, quantity, price });
    }
    await userCart.save();

    return res.status(200).json({ status: true, message: "Cart updated successfully" });
}

export const removeToCart = async (req,res) => {
    let { cartItemId, size} = req.body;
 
    console.log("cartItemId, size",cartItemId, size); 
    let userId = req.user.id; 
    let userCart = await Cart.findOne({userId});
    console.log(userCart);
    if(userCart) {
        userCart.item = userCart.item.filter((item) => !(item._id.toString() === cartItemId && item.size === size));
        await userCart.save();
        return res.status(httpStatus.OK).json({message: "Item removed successfully"});
    } else {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error: "There is no such item in a Cart!"}); 
    }
}

export const updateToCart = async (req,res) => {

    let { cartItemId, size, action } = req.body;
    let userId = req.user.id;

    let userCart = await Cart.findOne({ userId });

    if(!userCart){
        return res.status(httpStatus.NOT_FOUND).json({error: 'Cart not found!'});
    }

    let item =  userCart.item.find((item) => item._id.toString() === cartItemId && item.size === size);
    if(!item) {
        return res.status(httpStatus.NOT_FOUND).json({error: 'Product not found!'});
    }

    if(action === 'increase') {
        item.quantity = item.quantity + 1;
    } else {
       item.quantity = Math.max(1, item.quantity-1);
    }

    await userCart.save();
    res.status(httpStatus.OK).json({message: 'Cart updated successfully'});
} 

