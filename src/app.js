import express from 'express';
import indexRouter from "./routes/index.js";
import {logger} from "./middlewares/logger.js";
import { delay } from './middlewares/delay.js';
import cors from 'cors'; //출처 간 요청 허용/차단
import morgan from 'morgan'; //http 요청 한줄 출력
import helmet from 'helmet'; //http 응답 헤더 자동으로 붙혀주기
import { errorHandler } from './middlewares/errorHandler.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger); //모든 요청에 로깅 적용
app.use('/test',delay); //test 경로에만 지연적용
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/',indexRouter);
app.use(errorHandler);
app.listen(PORT, ()=>{
  console.log(`Server is Running on http://localhost:${PORT}`);
})