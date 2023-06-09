import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    res.status(200).json({ message: "upload api is running..." })
});

router.get('/', async (req: Request, res: Response) => {
    res.status(200).json({ message: "upload api is running..." })
});


export default router;
