import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [{ 
        productId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product',
            required: true
        },
        name: { type: String ,required: true },
        description: { type: String ,required: true },
        image: [{ type: String ,required: true }],
        category: { type: String ,required: true},
        subCategory: { type: String ,required: true},
        quantity: { type: Number ,required: true},
        size: { type: String ,required: true},
        price: { type: Number ,required: true},
    }],
    address: { type: Object, required: true },
    amount: { type: Number, required: true },
    status: {
        type: String,
        required: true,
        default: "Order Placed",
        enum: ["Order Placed", "Shipped", "Out for Delivery", "Delivered"],
    },
    paymentMode: { type: String, required: true },
    payment: { type: Boolean, required: true, default: false },
    date: { type: Number, required: true },
},{ timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
