import {Request, Response, NextFunction} from 'express';

// if you're running into issues (such as [ERR_REQUIRE_ESM]: require() of ES Module), you might need to update the package json exports
// to match the cjs variants. This is a known issue with pocketbase and was marked as "will not be solved".
import PocketBase from 'pocketbase';

export const useVerifyUserId = (req: Request, res: Response, next: NextFunction) => {
    const id = req.headers.user_id as string;
    const pb = new PocketBase('https://revline-db.programar.io');

    pb.collection('users').getOne(id).then((user) => {
        next();
    }).catch((error) => {
        res.status(403).json({error: 'Unauthorized'});
    });
};
