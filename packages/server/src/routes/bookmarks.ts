import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import { Bookmark } from '../models/bookmark';
import Bookmarks from '../services/bookmark-svc';

const router = express.Router();

router.get('/:bookmarkId', (req: Request, res: Response) => {
	const username = res.locals.username;
	const { bookmarkId } = req.params;

	Bookmarks.get(bookmarkId)
		.then((bookmark: Bookmark) => {
			if (bookmark.username !== username)
				res.status(403).send('Forbidden: Access is denied.');
			else res.json(bookmark);
		})
		.catch((error) => res.status(404).send(error));
});

router.post('/', (req: Request, res: Response) => {
	const username = res.locals.username;
	const newBookmark: Bookmark = req.body;
	newBookmark.username = username;

	Bookmarks.create(newBookmark)
		.then((bookmark: Bookmark) => res.status(201).json(bookmark))
		.catch((error) => res.status(500).send(error));
});

router.put('/:bookmarkId', (req: Request, res: Response) => {
	const username = res.locals.username;
	const { bookmarkId } = req.params;
	const newBookmark = req.body;
	newBookmark._id = bookmarkId;
	newBookmark.username = username;

	Bookmarks.update(bookmarkId, newBookmark)
		.then((bookmark: Bookmark) => res.json(bookmark))
		.catch((error) => res.status(404).send(error));
});

router.delete('/:bookmarkId', (req: Request, res: Response) => {
	const username = res.locals.username;
	const { bookmarkId } = req.params;

	Bookmarks.remove(bookmarkId)
		.then(() => res.status(204).end())
		.catch((error) => res.status(404).send(error));
});

export default router;
