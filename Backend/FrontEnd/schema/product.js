import mongoose from "mongoose"

const productSchema=new mongoose.Schema({
    productname:{
        type:String,
        require:true,
    },
    prodprice:{
        type:Number,
        require:true
    }
})
const product=mongoose.model("product",productSchema)
export default product;