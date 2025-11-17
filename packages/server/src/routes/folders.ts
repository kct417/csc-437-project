import express, { Request, Response } from 'express';

import { Folder } from '../models/folder';
import Folders from '../services/folder-svc';

const router = express.Router();

router.get('/:folderId', (req: Request, res: Response) => {
	const { folderId } = req.params;

	Folders.get(folderId)
		.then((folder: Folder) => res.json(folder))
		.catch((error) => res.status(404).send(error));
});

router.post('/', (req: Request, res: Response) => {
	const newFolder = req.body;
	const { userId } = (req as any).user;
	newFolder.userId = userId;

	Folders.create(newFolder)
		.then((folder: Folder) => res.status(201).json(folder))
		.catch((error) => res.status(500).send(error));
});

router.put('/:folderId', (req: Request, res: Response) => {
	const { folderId } = req.params;
	const newFolder = req.body;

	Folders.update(folderId, newFolder)
		.then((folder: Folder) => res.json(folder))
		.catch((error) => res.status(404).send(error));
});

router.delete('/:folderId', (req: Request, res: Response) => {
	const { folderId } = req.params;

	Folders.remove(folderId)
		.then(() => res.status(204).end())
		.catch((error) => res.status(404).send(error));
});

export default router;
