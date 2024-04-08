import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        price:{ 
            type: Number
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category"
        }
})
export default mongoose.model('products', productSchema);
