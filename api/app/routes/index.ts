import { Router, Request, Response } from 'express';
import * as service from '../services/FileUpload.services';

const router = Router();

router.get('', async (req: Request, res: Response) => {
    let r = await service.getAll();
    return res.status(200).json({ message: "All Data", data: r })
});

router.post('/create', async (req: Request, res: Response) => {
    const { description, rate, amount, quantity } = req.body;
    let _payload = {
        description,
        rate,
        amount,
        quantity
    }
    await service.create(_payload).then(res => {
        return { message: "Data Created Successfully" }
    }).catch(eer => console.log(eer));
})

router.put('/update/:id', (req: Request, res: Response) => {
    res.status(201).json({ message: "PUT api working..." })
})

router.delete('/delete/:id', (req: Request, res: Response) => {
    res.status(201).json({ message: "DELTE api working..." })
})

export default router;