import express, { Request, Response } from 'express';

import { Library } from 'models/library';
import Libraries from '../services/library-svc';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
	const { userId } = (req as any).user;
	Libraries.get(userId)
		.then((user: Library) => res.json(user))
		.catch((error) => res.status(404).send(error));
});

export default router;
