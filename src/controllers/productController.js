import pool from '../config/db.js';
import HttpError from '../error/httpError.js';

//전체조회
export const getAllProducts = async (req,res,next)=>{
        console.log(2);

    try{
        const [rows] = await pool.query("SELECT * FROM products");
        res.status(200).json({data : rows});
    }catch(err){
        return next(new HttpError(500,"Internal Server Error"));
    }
}


//단일 조회
export const getProductById = async (req,res,next)=>{
    const id = Number(req.params.id);
    console.log(1);
    if(isNaN(id) || id <= 0)
        return next(new HttpError(400,"Bad Request"));
    try{
        const [rows] = await pool.execute("SELECT * FROM products WHERE id = ?",[id]);
        console.log(rows);
        if(rows.length === 0){
            return next(new HttpError(404,"Not Found"));
        }
        res.status(200).json({data : rows[0]});
    }catch(err){
        next(new HttpError(500,"Internal Server Error"));
    }
}

//상품 생성
export const createProduct =  async (req,res,next)=>{
    const {name, price} = req.body;
    console.log(3);

    if(typeof price != 'number' || isNaN(price)){
        return next(new HttpError(400,"Bad Request"));
    }
    try{
        const [result] = await pool.query("INSERT INTO products (name,price) VALUES(?,?)",[name,price]);
        res.status(201).json({data : result});
    }catch(err){
        next(new HttpError(500,"Internal Server Error"));
    }
}

//상품 정보 업데이트
export const updateAllProduct =  async (req,res,next)=>{
        console.log(4);

    const id = Number(req.params.id); //id로 수정하기    
    const {name,price} = req.body;

    if(!name || !price)
        return next(new HttpError(400,"Name and email are required"));

    try{
        const [result] = await pool.query("UPDATE products SET name = ?, price = ? WHERE id = ?",[name,price,id]);
        
        res.status(200).json({data : result});
    }catch(err){
        next(err);
    }

}

// //상품 정보 부분 업데이트
// export const updatePartProduct =  async (req,res,next)=>{
//     const id = Number(req.params.id);
//     if(!product){
//         return next(new HttpError(404,"Name and price are required"));
//     }
//     const {name, price} = req.body;
//     //둘 중에 아무거나 수정해도된다.(입력 안하면 그냥 넘어가도록)
//     if(name) product.name = name;
//     if(price) product.price = price;

//     res.json({data : product});
// }


export const deleteProduct = async (req,res,next)=>{
        console.log(5);

    const id = Number(req.params.id);

    if(!id){
        return next(new HttpError(400,"Invalid Error"));
    }

    try{
        const [result] = await pool.execute("DELETE FROM products WHERE id = ?", [id]);
    
        if(result.affectedRows === 0){
            return next(new HttpError(404,"User Not Found"));
        }

        return res.status(200).json({data : `User id ${id} is deleted`});
    }catch(err){
        next(err)
    }

}