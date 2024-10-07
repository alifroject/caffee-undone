import { Request, Response } from 'express';
import User from '../models/UserModels';  // Pastikan ekstensi file yang benar
import argon2 from 'argon2';
import { where } from 'sequelize';

// Function to get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await User.findAll({
            attributes: ['uuid', 'name', 'email', 'phone', 'province', 'city', 'role', 'createdAt', 'updatedAt']
        });

        res.status(200).json(response);  // Return an array of users
    } catch (error) {
        res.status(500).json({ msg: (error as Error).message });  // Handle error
    }
};

export const getUsersById = async (req: Request, res: Response): Promise<void> => {
    try {
    const response = await User.findOne({
        attributes: ['uuid', 'name', 'email', 'phone', 'province', 'city', 'role', 'createdAt', 'updatedAt'],
        where: {
            uuid: req.params.id
        }
    })

    res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: (error as Error).message });  
    }
}


export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, phone, province, city, role } = req.body;
    
    try {
        // Hash password using argon2
        const hashPassword = await argon2.hash(password);
        // Create new user with role "user"
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role, 
            phone: phone,
            province: province,
            city: city
        });
        // Successful user creation, send success response
        res.status(201).json({ msg: "User registered successfully", user: newUser });
    } catch (error) {
        // Handle error while creating user
        res.status(400).json({ msg: ( error as Error).message });
    }
};


export const updateUser = async(req: Request, res: Response): Promise<void> => {
    const {name, email, password, phone, province, city, role} = req.body;

    try {
        const users = await User.findOne({
            where: {
                uuid: req.params.id
            }
        });

        if(!users){
             res.status(404).json({msg: "User not found"}) 
             return
            };

        let hashPassword;

        if(!password) {
            hashPassword = users.password;
    
        } else {
            hashPassword = await argon2.hash(password)
        }

        const [UpdateUser] = await User.update({
                name: name,
                email: email,
                password: hashPassword,
                role: role, 
                phone: phone,
                province: province,
                city: city
        }, {
            where: {
                userId: users.userId
            }
        });

        res.status(201).json({msg: "User updated seuccessfully", user: UpdateUser})
    } catch(err) {
      res.status(400).json({msg: (err as Error).message})
    }
}



export const deleteUser = async (req: Request, res: Response):  Promise<void> => {
    try {
      const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
      });

      if (!user) {
         res.status(404).json({ msg: "User not found" })
         return;
      }


      await User.destroy({
        where: {
            userId: user.userId
        }
      });

      res.status(200).json({ msg: "User deleted successfully" });
    } 
    catch (err) {
        res.status(400).json({msg: (err as Error).message});
    }
}