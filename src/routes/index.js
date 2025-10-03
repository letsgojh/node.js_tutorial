import { Router } from "express";

const indexRouter = Router();

indexRouter.get('/',(req,res)=>{
    const {active, page} = req.query;
    res.json({
        message: "User List",
        filters: { active, page }
    });
})

indexRouter.post('/',(req,res)=>{
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        const {name, email} = req.body;
        res.status(201).json({
        message: "User Created",
        data: {
            name: name,
            email: email
        }
    });
})

export default indexRouter;