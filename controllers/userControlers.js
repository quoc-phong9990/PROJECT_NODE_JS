import User from '../models/users.js';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'


export async function signup(req, res) {
    const data = req.body;
    //check email
    const userExist = await User.findOne({ email: data.email });
    if (userExist) {
        return res.json({
            message: `Đã tồn tại email ${data.email}`
        })
    }
    // Mã hóa mật khẩu
    const passwordHashed = await bcryptjs.hash(data.password, 10);

    // thay thế password cũ bằng password đã mã hóa
    data.password = passwordHashed;

    User.create(data)
        .then((newData) => {
            res.json(newData);
        })
        .catch((err) => {
            res.json({ message: err });
        })

}
//// [POST] user/signin
export async function signin(req, res) {
    try {
        const data = req.body
        // b1 kiểm tra user có tài khoản hay không
        const userExist = await User.findOne({ email: data.username });

        if (!userExist) {
            return res.json({ message: "Sai tài khoản" })
        }

        // Kiểm tra mật khẩu
        const isCheck = await bcryptjs.compare(data.password, userExist.password);

        if (!isCheck) {
            return res.json({ message: "Sai mật khẩu" })
        }
        
        // xóa mật khẩu
        userExist.password = undefined;
        // tạo 1 token
        const token = await jwt.sign({ name: userExist.name, id: userExist._id }, process.env.KEY_SECRET, { expiresIn: "3000h" })

        res.json({
            message: "Đăng nhập thành công",
            userExist,
            token
        })
    } catch (error) {
        res.json(error)
    }

}

export function Index(req, res) {
    User.find()
        .then(data => {
            res.json(data);
        })
        .catch(() => {
            res.json({ message: "Có lỗi khi lấy dữ liệu001" });
        });

}
// add
export function addUser(req, res) {
    let data = req.body;
    if (data) {
        User.create(data)
            .then(data => {
                res.json(data);

            })
            .catch(() => {
                res.json({ err: "kiểm tra lại user của bạn " })
            })
    } else {
        res.json({ err: "khong lay duoc du lieu" });
    }
}
// get user/id
export function getID(req, res) {
    const id = req.params.id;
    console.log(id);
    if (id) {
        User.findById(id)
            .then(data => {
                if (data)
                    res.json(data)

                else
                    res.json({ err: "khong tim thay user" })
            })
            .catch(() => {
                res.json({ err: "co loi khi tim kiem user" })
            });

    } else {
        res.json({ err: "khong tim thay id user" })
    }
}
// updata user/id
export function update(req, res) {
    const id = req.params.id
    if (id) {
        const data = req.body;
        if (data != {}) {
            User.findByIdAndUpdate(id, data, { new: true })
                .then(data => {
                    res.json(data)
                })
                .catch(() => {
                    res.json({ err: "sua loi nhe" })
                })
        } else {
            res.json({ err: "khong tim thay user" })
        }
    } else {
        res.json({ err: "khong tim thay user" })
    }
}
// delete


export function remove(req, res) {
    const id = req.params.id;
    if (id) {
        User.findByIdAndDelete(id)
            .then((data) => {
                res.json(data)
            })
            .catch(() => {
                res.json({ err: "xoa that bai" })
            })
    } else {
        res.json({ err: "khong tim thay id user" })
    }
}
