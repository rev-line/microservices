import express from 'express';
import { useVerifyUserId } from '../guards/useVerifyUserId';

const router = express.Router();

router.get('/protected', useVerifyUserId, (req, res) => {
    res.json({ message: 'This is a protected route', user: (req as any).user });
});

export default router;
