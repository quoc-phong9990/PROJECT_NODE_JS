import express from 'express';
import 'dotenv/config'
import { engine } from 'express-handlebars';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import router from './router/app2.js';
import mongoose from 'mongoose'; // Fixed import statement
import checkAuth from './middlesware/Auth.js';
// var cors = require('cors')

mongoose.connect(process.env.CONNECTION_STRING_MONGODB)
  .then(() => console.log('Connected! thanh cong'));


const app = express();
// const port = 3000;
const port = process.env.PORT;
app.use(express.json());




// views
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname,'uploads')))

import userRouter from './router/user.js'
import productRouter from './router/product.js'
import categoryRouter from './router/category.js'
import cartRouter from './router/cart.js'
import commonRouter from './router/common.router.js'
import Bookrouter from './router/book.js'

app.use('/user',userRouter);
app.use('/',commonRouter)
router(app);
app.use(cors())
app.use('/product',checkAuth,productRouter);
app.use('/book',checkAuth,Bookrouter);
app.use('/category',checkAuth,categoryRouter);
app.use('/cart',checkAuth,cartRouter);
app.use('/',commonRouter)

app.listen(port, () => {
  console.log(`Example app listening on port: ${ port}`);
});
