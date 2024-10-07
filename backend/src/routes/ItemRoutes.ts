import express from 'express';
import {
    getItems,
    createItems
} from '../controller/Items';  // Pastikan ekstensi file yang benar jika diperlukan

import { verifyUser, adminOnly } from '../middleware/AuthUser';

const router = express.Router();

// Route to get all users
router.get('/items', verifyUser, getItems);
//router.get('/users/:id',verifyUser, getUsersById)
router.post('/items',verifyUser, adminOnly, createItems);

export default router;