import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// 기본 라우트
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.get('/api/status',(req,res)=>{
    res.status(200).json({status : 'OK', timestamp : Date.now()});
});

app.get('/hello',(req,res)=>{
    res.send("안녕하세요, Express!");
})

app.get('/api/time',(req,res)=>{
    const date = new Date();
    res.json({time : date.toISOString()});
})