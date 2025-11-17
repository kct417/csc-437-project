import express, { Request, Response } from 'express';

import { Bookmark } from '../models/bookmark';
import Bookmarks from '../services/bookmark-svc';

const router = express.Router();

router.get('/:bookmarkId', (req: Request, res: Response) => {
	const { bookmarkId } = req.params;

	Bookmarks.get(bookmarkId)
		.then((bookmark: Bookmark) => res.json(bookmark))
		.catch((error) => res.status(404).send(error));
});

router.post('/', (req: Request, res: Response) => {
	const newBookmark: Bookmark = req.body;

	Bookmarks.create(newBookmark)
		.then((bookmark: Bookmark) => res.status(201).json(bookmark))
		.catch((error) => res.status(500).send(error));
});

router.put('/:bookmarkId', (req: Request, res: Response) => {
	const { bookmarkId } = req.params;
	const newBookmark = req.body;

	Bookmarks.update(bookmarkId, newBookmark)
		.then((bookmark: Bookmark) => res.json(bookmark))
		.catch((error) => res.status(404).send(error));
});

router.delete('/:bookmarkId', (req: Request, res: Response) => {
	const { bookmarkId } = req.params;

	Bookmarks.remove(bookmarkId)
		.then(() => res.status(204).end())
		.catch((error) => res.status(404).send(error));
});

export default router;
