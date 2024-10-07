import User from "../models/UserModels"
import { Request, Response } from 'express';
import  argon2  from "argon2"


export const Login = async(req: Request, res: Response) => {
   
    
        const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })


    if(!user) return res.status(404).json({msg: "User not found"});

    const match = argon2.verify(user.password, req.body.password) //memperifikasi password dari body html

    if(!match) return res.status(400).json({msg: "Wrong password"})
        req.session.userId = user.uuid;
        const uuid = user.uuid;
        const name = user.name;
        const email = user.email;
        const role = user.role;

        res.status(200).json({uuid, name, email, role})
}
   



export const Me = async (req: Request, res: Response) => {
    if(!req.session.id) {
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }

    const user = await User.findOne({
        attributes: ['uuid', 'name', 'email', 'phone', 'province', 'city', 'role'],
        where: {
            uuid: req.session.userId
        }
    })
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);
}


export const Logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "Logout Failed"});
        res.status(200).json({msg: "Logout is successfull"})
    });
}