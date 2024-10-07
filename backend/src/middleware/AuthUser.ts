import { Next } from "mysql2/typings/mysql/lib/parsers/typeCast";
import { Request, Response } from 'express';
import User from "../models/UserModels"


export const verifyUser = async (req: Request, res: Response, next: Next) => {
    if(!req.session.userId) {
        return res.status(401).json({msg: "Mohon login ke akun anda!"});
    }

    const user = await User.findOne({
        where: {
          uuid:  req.session.userId
       }
    });


    if(!user) return res.status(201).json({msg: "User tidak ditemukkan!"});
    req.userId = user.userId;
    req.role = user.role;
    req.user = user
    next();

}

export const adminOnly = async (req: Request, res: Response, next: Next) => {
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    if(user.role !== "admin") return res.status(403).json({msg: "Akses terlarang"});
    next();
    
   
}