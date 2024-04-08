import express from "express";
var router = express.Router()

import {index,addProduct,update,remove,getById} from '../controllers/ProductControllers.js '


router.get('/', index)

router.post('/',addProduct ) 

router.put('/:id', update)

router.delete('/:id', remove),

router.get('/:id', getById)

export default router