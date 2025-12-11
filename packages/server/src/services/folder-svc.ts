import { Schema, Types, model } from 'mongoose';

import { Folder } from '../models/folder';

const folderSchema = new Schema<Folder>(
	{
		username: { type: String, required: true, trim: true },
		folderName: { type: String, required: true, trim: true },
		description: { type: String, trim: true },
		image: { type: String },
		url: { type: String, trim: true },
	},
	{ collection: 'folders' }
);

folderSchema.virtual('bookmarks', {
	ref: 'Bookmark',
	localField: '_id',
	foreignField: 'folderId',
});

folderSchema.set('toJSON', { virtuals: true });
folderSchema.set('toObject', { virtuals: true });

export const FolderModel = model<Folder>('Folder', folderSchema);

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
	await model('Bookmark').deleteMany({ folderId });
	if (!deletedFolder) throw `${folderId} not deleted`;
}

export default { auth, get, create, update, remove };
