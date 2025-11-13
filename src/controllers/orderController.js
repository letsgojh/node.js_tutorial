import pool from '../config/db.js';
import HttpError from '../error/httpError.js';

// 전체 주문 조회
export const getAllOrders = async (req, res, next) => {
	try {
		const [rows] = await pool.query('SELECT * FROM orders');
		res.json({ data: rows });
	} catch (err) {
		next(new HttpError(500,"Internal Server Error"));
	}
};

// 주문 생성
export const createOrder = async (req, res, next) => {
	const { user_id, product_id } = req.body;

	if(!user_id || !product_id){
		return next(new HttpError(400,"Bad Request"));
	}

	try {
		const [result] = await pool.execute(
			'INSERT INTO orders (user_id, product_id) VALUES (?, ?)',
			[user_id, product_id]
		);

		res.status(201).json({
			data: { id: result.insertId, user_id, product_id },
		});
	} catch (err) {
		next(new HttpError(404,"Not Found"));
	}
};

// 특정 사용자 주문 조회
export const getUserOrders = async (req, res, next) => {
	const {id} = req.params;
	console.log("함수진입123");
	try {
		const [rows] = await pool.execute(
			'SELECT * FROM orders WHERE user_id = ?',[id]
		);

		if(rows.length === 0){
			return next(new HttpError(404,"Not Found"));
		}
		res.json({ data: rows });
	} catch (err) {
		next(new HttpError(500,"Internal Server Error"));
	}
};


// 사용자+상품 JOIN 조회
export const getJoinedOrders = async (req, res, next) => {
	try {
		const sql = `
      SELECT o.id AS order_id,
             u.name AS user_name,
             p.name AS product_name,
             o.order_date
      FROM orders o
      JOIN users u ON o.user_id    = u.id
      JOIN products p ON o.product_id = p.id
	  WHERE o.user_id = -1`;
	  console.log(sql);
		const [rows] = await pool.query(sql);

		if(rows.length === 0){
			next(new HttpError(200,"OK"));
			return res.json({data : []});
		}
		res.json({ data: rows });
	} catch (err) {
		next(new HttpError(500,"Internal Server Error"));
	}
};
