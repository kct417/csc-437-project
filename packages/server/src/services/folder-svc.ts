import { Schema, model } from 'mongoose';

import { Folder } from '../models/folder';

const FolderSchema = new Schema<Folder>(
	{
		folderName: { type: String, trim: true, required: true },
		description: { type: String, trim: true },
		image: { type: String, trim: true },
		url: { type: String, trim: true },
		created: { type: Date, default: Date.now },
		modified: { type: Date, default: Date.now },
	},
	{ collection: 'folders' }
);

FolderSchema.virtual('bookmarks', {
	ref: 'Bookmark',
	localField: '_id',
	foreignField: 'folderId',
});

FolderSchema.set('toJSON', { virtuals: true });
FolderSchema.set('toObject', { virtuals: true });

export const FolderModel = model<Folder>('Folder', FolderSchema);

export async function auth(
	folderId: string,
	tokenUserId: string
): Promise<boolean> {
	const found = await FolderModel.exists({
		_id: folderId,
		userId: tokenUserId,
	});
	return found !== null;
}

export async function get(folderId: string): Promise<Folder> {
	const folder = await FolderModel.findById(folderId).populate('bookmarks');
	if (!folder) throw `${folderId} not found`;
	return folder as Folder;
}

export async function create(json: Folder): Promise<Folder> {
	const folder = new FolderModel(json);
	return folder.save();
}

export async function update(
	folderId: String,
	newFolder: Folder
): Promise<Folder> {
	const updatedFolder = await FolderModel.findByIdAndUpdate(
		folderId,
		newFolder,
		{ new: true }
	);

	if (!updatedFolder) throw `${folderId} not updated`;
	return updatedFolder as Folder;
}

export async function remove(folderId: String): Promise<void> {
	const deletedFolder = await FolderModel.findByIdAndDelete(folderId);

	if (!deletedFolder) throw `${folderId} not deleted`;
}

export default { auth, get, create, update, remove };
