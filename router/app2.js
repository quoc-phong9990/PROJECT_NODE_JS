
import productRouter from './product.js'
import bookRouter from './book.js'
import categoryRouter from './category.js'
import userRouter from './user.js'
import checkAuth from '../middlesware/Auth.js';

function router(app) {
    app.use('/product',checkAuth,productRouter);
    app.use('/category',categoryRouter);
    app.use('/user',userRouter);
    app.use('/book',bookRouter)
    
}
export default router;