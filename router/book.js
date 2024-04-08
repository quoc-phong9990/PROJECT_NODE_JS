
import {index,addBook,update,remove,getById,signup,signin} from '../controllers/BookController.js'
import express from "express";
var router = express.Router()

router.get('/', index)
router.post('/signup',signup)
router.post('/signin',signin)

router.post('/add',addBook ) 

router.put('/:id', update)

router.delete('/:id', remove),

router.get('/:id', getById)

export default router