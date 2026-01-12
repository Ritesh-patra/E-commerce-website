import mongoose from "mongoose";

const producSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array ,required: true},
  date: { type: Number, required: true },
  bestSeller: { type: Boolean , default: false }
});

const Product = mongoose.model('Product',producSchema);

export default Product;

  // {
  //   _id: "aaaab",
  //   name: "Men Round Neck Pure Cotton T-shirt",
  //   description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
  //   price: 200,
  //   image: [p_img2_1,p_img2_2,p_img2_3,p_img2_4],
  //   category: "Men",
  //   subCategory: "Topwear",
  //   sizes: ["M", "L", "XL"],
  //   date: 1716621345448,
  //   bestseller: false,
  // }