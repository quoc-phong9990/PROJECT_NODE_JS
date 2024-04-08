import multer from "multer";
import path from 'path';

const storage= multer.diskStorage({
    // khai báo nơi lưu trữ file
    destination: (req,file,callback)=>{
        callback(null,'uploads')
    },
    filename: (req,file,callback)=>{
        // console.log(file);
        const filename = Date.now() + path.extname(file.originalname)
        // console.log(filename);
        req.body.image =  filename;
        callback(null, filename)
    }
})


// export const upload = multer({storage: storage})
export const upload = multer({storage: storage})

const multiStorage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,'uploads')
    },
    filename: (req,file,callback)=>{
        // console.log(file);
        req.body.filenameArr = req.body.filenameArr || [];
        const filename = Date.now() + path.extname(file.originalname)
        // console.log(filename);
        req.body.filenameArr.push(filename)
        callback(null, filename)
    }
})


export const mutiUpload = multer({storage : multiStorage})