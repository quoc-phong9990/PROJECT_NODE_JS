import express from "express";
var router = express.Router()

import {signup,Index,addUser,getID,update,remove ,signin} from '../controllers/userControlers.js'
router.get('/', Index)
router.post('/signup',signup)
router.post('/signin',signin)
router.post('/add', addUser)
router.put('/:id', update)
router.delete('/:id', remove)
router.get('/:id', getID)


export default router