import express, { Request, Response } from 'express';
import UserModel from '../models/User.model';
import { UserInterface } from '../types/main';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const userId = req.header('x-user-id');
    console.log(userId);
    const data = await UserModel.find({ userId });
    res.send(data);
});

router.post('/', async (req: Request, res: Response) => {
    const {
        userId,
        username,
        email,
        isMobileVerified,
        photoURL,
    }: UserInterface = req.body;

    try {
        console.log({
            userId,
            username,
            email,
            isMobileVerified,
            photoURL,
        });
        const newUser = new UserModel({
            userId,
            username,
            email,
            isMobileVerified,
            photoURL,
        });
        const data = await newUser.save();
        res.send(data);
    } catch (err) {
        console.error(err);
    }
});

export default router;
