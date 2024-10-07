import express from 'express';
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUsersById
} from '../controller/Users';  // Pastikan ekstensi file yang benar jika diperlukan

import { verifyUser, adminOnly } from '../middleware/AuthUser';

const router = express.Router();

// Route to get all users
router.get('/users',verifyUser, getUsers);
router.get('/users/:id',verifyUser, getUsersById)
router.post('/users',verifyUser, createUser);
router.patch('/users/:id',verifyUser, updateUser);
router.delete('/users/:id',verifyUser, deleteUser);



export default router;
