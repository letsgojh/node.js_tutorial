import pool from '../config/db.js';
import HttpError from '../error/httpError.js';

//전체조회
export const getAllUsers = async (req,res,next)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM users');
        res.status(200).json({data : rows});
        //select문은 rows와 fileds 필드 반환, rows필드만 있으면된다.
    }catch(err){
        next(new HttpError(500, 'DB 조회 실패'));
    }
}


//단일 조회
export const getUserById = async (req,res,next)=>{
    const id = Number(req.params.id);

    if(!id)
        return res.status(400).json({data : "Invalid ID"});
    try{
        const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?',[id]);

        return res.status(200).json({data : rows});
    }catch(err){
        next(new HttpError(500, "DB 삽입 실패"));
    }
}

//상품 생성
export const createUser = async (req,res,next)=>{
    const {name, email} = req.body;

    if(!name || !email){
        return res.status(400).json({data : 'Name and email are required'});
    }
    try{

        let [rows] = await pool.execute('SELECT COUNT(*) as cnt FROM users WHERE email = ?',[email]);

        if(rows[0].cnt !==0)
            return res.status(400).json({data : 'Already same email exist !'});

        const[result] = await pool.execute('INSERT INTO users (name,email) VALUES(?, ?)',[name,email]);
        const id = result.insertId; //mysql은 insertId를 반환한다.
        //insert문은 result 필드 반환. result필드는 filedCount, affectedRows(영향 받은 행 수), insertid 등등 필드 존재한다.
        res.status(201).json({data : {id : id, name, email }});
    }catch(err){
        next(err);
    }
}

//상품 정보 업데이트
export const updateAllUser = async (req,res,next)=>{
    const id = Number(req.params.id); //id로 수정하기
    let {name, email} = req.body;
    
    if(!name || !email)
        return res.status(400).json({data : "Name and email are required"});

    try{
        const [result] = await pool.execute('UPDATE users SET name = ?, email = ? WHERE id = ?',[name,email,id]);
        res.status(201).json({data : {id : id,name,email}});
    }catch(err){
        next(err);
    }

}

//상품 정보 부분 업데이트
// export const updatePartUser =  async (req,res,next)=>{
//     const id = Number(req.params.id);
//     const {name, email} = req.body;

//     if(!id)
//         return res.status(400).json({data : `Invalid ID`});
//     try{
//         const [result] = await pool.execute("UPDATE users SET name = ?, email = ? WHERE id = ?",[name,email,id]);
        
//         return res.status(200).json({data : {id : id, name, email}});
//         //둘 중에 아무거나 수정해도된다.(입력 안하면 그냥 넘어가도록)
//     }catch(err){
//         next(err);
//     }
// }


export const deleteUser = async (req,res,next)=>{
    const id = Number(req.params.id);

    if(!id){
        return next(new HttpError(400,"Invalid Id"));
    }

    try{
        const [result] = await pool.execute('DELETE FROM users WHERE id = ?',[id]);

        if(result.affactedRows === 0){
            return res.status(404).json({data : "User not found"});
        }
        return res.status(200).json({data : `User id ${id} is deleted`});
    }catch(err){
        next(err);
    }

}