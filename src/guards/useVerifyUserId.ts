import {Request, Response, NextFunction} from 'express';
import Pocketbase from 'pocketbase';

export const useVerifyUserId = (req: Request, res: Response, next: NextFunction) => {
    const id = req.headers.user_id as string;
    const pb = new Pocketbase('https://revline-db.programar.io');

    pb.collection('users').getOne(id).then((user) => {
        next();
    }).catch((error) => {
        res.status(403).json({error: 'Unauthorized'});
    });
};
