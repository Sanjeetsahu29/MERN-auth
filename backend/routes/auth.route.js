import express from 'express';
const router = express.Router();
import { signup } from '../controllers/auth.controller.js';


router.post('/',signup);
export default router;