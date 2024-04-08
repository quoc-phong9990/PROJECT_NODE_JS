import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    year: {
        type: Number,
    },
    sale: {
        type: Boolean,
    },
 
    email: {
        type: String,
        required: [true, "Không được để trống email"], // yêu cầu cần có

    },
    password:{
        type:String,
        require:[true,"khong dc de trong password"]
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categorybook"
    },
});

export default mongoose.model('books', bookSchema);
