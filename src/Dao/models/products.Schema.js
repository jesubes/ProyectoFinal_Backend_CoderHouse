import mongoose from "mongoose";

const productCollection = 'products';

const productsSchema = new mongoose.Schema({
  title:{
    type: String,
    require:true
  },
  description: {
    type:String,
    require: true
  },
  code:{
    type:Number,
    require: true
  },
  price: Number,
  status:{
    type:Boolean,
    default: true
  },
  stock: Number,
  category:{
    type: String,
    enum:[
      "mochilas",
      "carteras",
      "billeteras",
      "morrales",
      "riñoneras",
      "bolsos"
    ]
  },
  thumbnail: Array,
  id: Number,
})

const productsModel = mongoose.model(productCollection, productsSchema);
export default productsModel;