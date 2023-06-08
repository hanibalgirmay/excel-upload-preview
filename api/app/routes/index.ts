import express, { Router, Request, Response } from 'express';

const router = Router();

router.get('', (req: Request, res: Response) => {
    res.status(200).json({ message: "GET Api working..." })
});

router.post('/create', (req: Request, res: Response) => {
    res.status(201).json({ message: "POST api working..." })
})

export default router;