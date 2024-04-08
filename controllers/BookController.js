import Book from "../models/book.js";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';


export async function signup(req, res) {
    const data = req.body;
    console.log(data);
    const userExist = await Book.findOne({ email: data.email })
    if (userExist) {
        return res.json({
            message: `Đã tồn tại email ${data.email}`
        })
    
    }
    // ma hoa
    const passwordbook = await bcryptjs.hash(data.password, 10);
    // thay thế password cũ bằng password đã mã hóa
    data.password = passwordbook;
    Book.create(data)
        .then((newData) => {
            res.json(newData);
        })
        .catch((err) => {
            res.json({ message: err })
        })

}
// signin
export async function signin(req, res) {
    try {
        const data = req.body
        // b1 kiểm tra user có tài khoản hay không
        const userExist = await Book.findOne({ email: data.username })

        if (!userExist) {
            return res.json({ message: "sai mat khau" })
        }
        // xóa mật khẩu
        userExist.password = undefined
        // tao 1 token
        const token = await jwt.sign({ name: userExist.name, id: userExist._id }, process.env.KEY_SECRET, { expiresIn: "1000000h" })

        res.json({
            message: "Dang Nhap Thanh cong",
            userExist,
            token
        })
    } catch (error) {
        res.json(error)
    }
}
// getbook
export function index(req, res) {
    Book.find().populate()
        .then(data => {
            res.json(data);
        })
        .catch(() => {
            res.json({ message: "Có lỗi khi lấy dữ liệu" });
        });
}

//[POST]: books

export function addBook(req, res) {
    let data = req.body;
    if (data) {
        Book.create(data)
            .then(data => {
                res.json(data);
            })
            .catch(() => {
                res.json({ message: "Có lỗi khi thêm sản phẩm" });
            });
    } else {
        res.json({ message: "Không lấy được dữ liệu" });
    }
}
//[GET]: books/:id
export function getById(req, res) {
    const id = req.params.id;
    if (id) {
        Book.findById(id).populate()
            .then(data => {
                if (data)
                    res.json(data);
                else
                    res.json({ message: "Không tìm thấy sản phẩm" });
            })
            .catch(() => {
                res.json({ message: "Có lỗi khi tìm kiếm sản phẩm" });
            });
    } else {
        res.json({ message: "Không tìm thấy id sản phẩm" });
    }
}
//[update]: book/:id
export function update(req, res) {
    const id = req.params.id
    if (id) {
        const data = req.body;
        if (data != {}) {
            // update
            Book.findByIdAndUpdate(id, data, { new: true })
                .then(data => {
                    res.json(data)
                })
                .catch(() => {
                    res.json({ message: "sua loi" })
                })
        } else {
            res.json({ message: "khong tim thay san pham" })

        }
    } else {
        res.json({ message: "khong tim thay id san pham" })
    }
}
// delete :book/:id
export function remove(req, res) {
    const id = req.params.id;
    if (id) {
        Book.findByIdAndDelete(id)
            .then((data) => {
                res.json(data)
            })
            .catch(() => {
                res.json({ message: "Xóa thất bại" })
            })
    } else {
        res.json({ message: "Không tìm thấy id sản phẩm" })
    }
}