import { Schema, model } from 'mongoose';

import { Bookmark } from '../models/bookmark';

export const BookmarkSchema = new Schema<Bookmark>(
	{
		bookmarkName: { type: String, trim: true, required: true },
		description: { type: String, trim: true },
		image: { type: String, trim: true },
		author: { type: String, trim: true },
		chapter: { type: String, trim: true },
		page: { type: Number },
		url: { type: String, trim: true },
		created: { type: Date, default: Date.now },
		modified: { type: Date, default: Date.now },
	},
	{ collection: 'bookmarks' }
);

export const BookmarkModel = model<Bookmark>('Bookmark', BookmarkSchema);

export async function get(bookmarkId: string): Promise<Bookmark> {
	const bookmark = await BookmarkModel.findById(bookmarkId);
	if (!bookmark) throw `${bookmarkId} not found`;
	return bookmark as Bookmark;
}

export async function create(json: Bookmark): Promise<Bookmark> {
	const bookmark = new BookmarkModel(json);
	return bookmark.save();
}

export async function update(
	bookmarkId: string,
	newBookmark: Bookmark
): Promise<Bookmark> {
	const updatedBookmark = await BookmarkModel.findByIdAndUpdate(
		bookmarkId,
		newBookmark,
		{ new: true }
	);
	if (!updatedBookmark) throw `${bookmarkId} not updated`;
	return updatedBookmark as Bookmark;
}

export async function remove(bookmarkId: string): Promise<void> {
	const deletedBookmark = await BookmarkModel.findByIdAndDelete(bookmarkId);
	if (!deletedBookmark) throw `${bookmarkId} not deleted`;
}

export default { get, create, update, remove };
