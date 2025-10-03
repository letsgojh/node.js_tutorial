import express from 'express';
import indexRouter from './routes/index.js';
import userRouter from './routes/users.js';
import productRouter from './routes/productRouter.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/',indexRouter);
app.use('/users',userRouter);

app.use('/product',productRouter);

app.listen(PORT, ()=>{
  console.log(`Server is Running on http://localhost:${PORT}`);
})