import mongoose, { Schema } from 'mongoose'

const cartSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    item:[{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true 
        },
        quantity: {
            type: Number,
            default: 1,
        },
        size: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    }]
});

const Cart = mongoose.model('Cart',cartSchema);

export default Cart;