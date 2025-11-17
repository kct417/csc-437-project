import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

import credentials from '../services/credential-svc';

const router = express.Router();

dotenv.config();
const TOKEN_SECRET: string = process.env.TOKEN_SECRET || 'NOT_A_SECRET';

router.post('/register', (req: Request, res: Response) => {
	const { username, password } = req.body;

	if (typeof username !== 'string' || typeof password !== 'string') {
		return res.status(400).send('Bad request: Invalid input data.');
	} else {
		credentials
			.create(username, password)
			.then((userId) => generateAccessToken(userId))
			.then((token) => res.status(201).send({ token: token }))
			.catch((error) => res.status(409).send({ error: error.message }));
	}
});

router.post('/login', (req: Request, res: Response) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(400).send({ error: 'Bad request: Invalid input data.' });
	} else {
		credentials
			.verify(username, password)
			.then((userId) => generateAccessToken(userId))
			.then((token) => res.status(200).send({ token: token }))
			.catch((error) =>
				res.status(401).send({ error: 'Unauthorized:' + error })
			);
	}
});

function generateAccessToken(userId: Types.ObjectId): Promise<String> {
	return new Promise((resolve, reject) => {
		jwt.sign(
			{ userId: userId },
			TOKEN_SECRET,
			{ expiresIn: '1d' },
			(error, token) => {
				if (error) reject(error);
				else resolve(token as string);
			}
		);
	});
}

export function authenticateUser(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		res.status(401).end();
	} else {
		jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
			if (decoded) {
				const payload = decoded as { userId: string };
				console.log('Authenticated user:', payload);
				(req as any).user = { userId: payload.userId };
				next();
			} else res.status(401).end();
		});
	}
}

export default router;
