import  express from 'express'
import { upload,mutiUpload } from '../middlesware/upload.js';
import { UploadDB, getImage,MultiUploadToDB} from '../controllers/commonController.js'

var router = express.Router()


// Lấy danh sách sản phẩm
router.post('/uploads',upload.single("image"),UploadDB);
// router.post('/multi',mutiUpload.array("images"),()=>{});
router.post('/multi',mutiUpload.array("images"),MultiUploadToDB);
router.post('/image',getImage);

export default router;