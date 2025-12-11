import express, { Request, Response } from 'express';

import { Library } from 'models/library';
import Libraries from '../services/library-svc';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
	const username = res.locals.username;
	console.log(username);
	Libraries.get(username)
		.then((user: Library) => res.json(user))
		.catch((error) => {
			Libraries.create(username)
				.then((user: Library) => res.status(201).json(user))
				.catch((error) => {
					console.log(error);
					res.status(500).send(error);
				});
		});
});

export default router;
