import mongoose from "mongoose";

// function validatorEmail(textEmail){
//     return /^\S+@\S+\.\S+$/.text(textEmail)
// }
const userSchema = new mongoose.Schema(
    {
        id: {
            type: Object

        },
        name: {
            type: String,

                // lowercase: true,  // chuyen in hoa ve in thuong
                // trim: true,    // xoa khoang trang dau va cuoi
                // minLength: [5, "can them it nhat 5 ky tu"],
                // maxLength: [10, "k them qua 10 ky tu"],
            required: [true, "khong dc de trong name"]
        },
        age: {
            type: Number,
            min: [0, "tuoi khong dc nho hown 0"],
            max: [100, "tuoi khong dc vuot qua 100"]
        },
        email: {
            type: String,
            // validate: {
            //     validator: validatorEmail,
            //     err: ("khong dung dinh dang")

            // },
            required: [true, "Không được để trống email"], // yêu cầu cần có

        },
        gender: {
            type: Boolean
        },
        password:{
            type:String,
            require:[true,"khong dc de trong password"]
        }
    },{timestamps:true}
)
export default mongoose.model('users', userSchema);