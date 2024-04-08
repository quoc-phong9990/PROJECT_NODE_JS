import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref : "user"
    },
    items : [
        {
            productId:{
                type: mongoose.Types.ObjectId,
                ref : "product"
            },
            quantity: {
                type: Number
            }
        }
    ]
},{timestamps: true})

export default mongoose.model("cart",orderSchema)