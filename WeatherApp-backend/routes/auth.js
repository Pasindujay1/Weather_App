

import express from 'express';
import { register,login } from '../controllers/auth.js';
import auth from "../middlware/auth.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', auth, async (req, res) => {
  try {
    return res.status(200).json({ ...req.user._doc });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;