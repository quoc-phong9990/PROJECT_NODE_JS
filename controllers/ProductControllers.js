
import Product from '../models/product.js';
import Categorie from '../models/category.js';



export async function signup(req, res) {
    const data = req.body;
    //check email
    const userExist = await Product.findOne({ email: data.email });
    if (userExist) {
        return res.json({
            message: `Đã tồn tại email ${data.email}`
        })
    }
    // Mã hóa mật khẩu
    const passwordHashed = await bcryptjs.hash(data.password, 10);

    // thay thế password cũ bằng password đã mã hóa
    data.password = passwordHashed;

    Product.create(data)
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
        const userExist = await Product.findOne({ email: data.username });

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
        const token = await jwt.sign({ name: userExist.name, id: userExist._id }, process.env.KEY_SECRET, { expiresIn: "2h" })

        res.json({
            message: "Đăng nhập thành công",
            userExist,
            token
        })
    } catch (error) {
        res.json(error)
    }

}


//[GET]: product
export function index(req, res) {
    Product.find().populate('categoryId')
        .then(data => {
            res.json(data);
        })
        .catch(() => {
            res.json({ message: "Có lỗi khi lấy dữ liệu" });
        });
 
}

//[POST]: product

export function addProduct(req, res) {
    let data = req.body;
    if (data) {
        Product.create(data)
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

//[GET]: product/:id
export function getById(req, res) {
    const id = req.params.id;
    if (id) {
        Product.findById(id).populate('categoryId')
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
//[update]: product/:id
export function update(req,res){
    const id=req.params.id
    if(id){
        const data=req.body;
        if(data!={}){
            // update
            Product.findByIdAndUpdate(id,data,{new:true})
            .then(data=>{
                res.json(data)
            })
            .catch(()=>{
                res.json({message:"sua loi"})
            })


        }else{
            res.json({message :"khong tim thay san pham"})

        }
    }else{
        res.json({message :"khong tim thay id san pham"})
    }
}

//[DELETE]: prduct/:id

export function remove(req,res){
    const id = req.params.id;
    if(id){
        Product.findByIdAndDelete(id)
            .then((data)=>{
                res.json(data)
            })
            .catch(()=>{
            res.json({message: "Xóa thất bại"})
            })
        }else{
            res.json({message: "Không tìm thấy id sản phẩm"})
        }
    }
// category
export function test(req,res){
  
const categoryId = req.params.id;
console.log(categoryId);

    product.find({ categoryId: categoryId })
    .populate("categoryId") 
    .exec((err, products) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(products); 

})
}