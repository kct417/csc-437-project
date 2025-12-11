import express, { Request, Response } from 'express';

import { Folder } from '../models/folder';
import Folders from '../services/folder-svc';

const router = express.Router();

router.get('/:folderId', (req: Request, res: Response) => {
	const username = res.locals.username;
	const { folderId } = req.params;

	Folders.get(folderId)
		.then((folder: Folder) => {
			if (folder.username !== username)
				res.status(403).send('Forbidden: Access is denied.');
			else res.json(folder);
		})
		.catch((error) => res.status(404).send(error));
});

router.post('/', (req: Request, res: Response) => {
	const username = res.locals.username;
	const newFolder: Folder = req.body;
	newFolder.username = username;

	Folders.create(newFolder)
		.then((folder: Folder) => res.status(201).json(folder))
		.catch((error) => {
			console.error(error);
			res.status(500).send(error);
		});
});

router.put('/:folderId', (req: Request, res: Response) => {
	const username = res.locals.username;
	const { folderId } = req.params;
	const newFolder = req.body;
	newFolder._id = folderId;
	newFolder.username = username;

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
