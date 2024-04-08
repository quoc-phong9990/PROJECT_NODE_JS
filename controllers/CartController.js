

export function index(req,res){

}
//[POST] cart
export function addCart(req, res) {
    const data = req.body;
    if (data) {
        Cart.create(data)
            .then(resData => res.status(201).json(resData))
            .catch(err => res.status(500).json({ message: err }));
    } else {
        res.status(400).json({ message: "Thiếu dữ liệu" });
    }
}


//[GET] cart/user/:id
export async function getCartByUserId(req,res){
    const idUser = req.params.id;
    const cartUser = await Cart.findOne({userId: idUser})
        .populate('userId')
        .populate({
            path: 'items.productId',
            populate :{
                path: 'categoryId'
            }
        });
    // console.log(cartUser);
    res.status(200).json(cartUser);
}

export async function updateItems(req,res){
    try {
        const id = req.params.id;
        const data = req.body;
        console.log(data);
        console.log(id);
        if(!id)
            return res.status(400).json({message: "Không tìm thấy id"});

        const cartNow = await Cart.findById(id);

        if(!cartNow || cartNow == {})
            return res.status(400).json({message: "Không tìm thấy giỏ hàng"});

        if(!data || data=={})
            return res.status(400).json({message: "Không nhận được dữ liệu"});

        //update item
        cartNow.items = data.items;

        // lưu vào trong CSDL
        await cartNow.save();

        res.status(200).json({
            messagae: "cập nhật thành công",
            cartNow
        })
    } catch (error) {
        res.status(500).json({message: error})
    }
}