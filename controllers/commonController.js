import Upload from '../models/upload.modle.js'
import 'dotenv/config'
export function UploadDB(req, res) {
    const data = req.body;
    data.type=2
    // console.log(data);
    if (!data || data == {})
        return res.json({ message: "Thiếu dữ liệu" });

    Upload.create(data)
        .then(resData => res.json(resData))
        .catch(err => res.json({ message: err }))
}
export function MultiUploadToDB(req,res){
    const data=req.body;
    data.type=2
    data.images=data.filenameArr
    Upload.create(data)
    .then(resData=>{
        res.status(201).json(resData)
    })
    .catch(err=>{
        res.status(400).json(err)
    })

}

// GETIMAGE
export function getImage(req, res) {
    Upload.find(1)
        .then(resdata => {
            console.log(resdata);
            resdata = resdata.map(item => {
                return {
                    id: item.id,
                    filename: process.env.URL_API + item.image
                }
            })
            res.json(resdata)
        })
        .catch(err => {
            res.json(err)
        })

}