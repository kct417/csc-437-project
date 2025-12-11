import { Schema, model } from 'mongoose';

import { Library } from '../models/library';

const librarySchema = new Schema<Library>(
	{
		username: { type: String, required: true, unique: true },
	},
	{ collection: 'libraries' }
);

librarySchema.virtual('folders', {
	ref: 'Folder',
	localField: 'username',
	foreignField: 'username',
});

librarySchema.set('toJSON', { virtuals: true });
librarySchema.set('toObject', { virtuals: true });

export const libraryModel = model<Library>('Library', librarySchema);

export async function get(username: string): Promise<Library> {
	const library = await libraryModel
		.findOne({ username: username })
		.populate('folders');
	if (!library) throw `${username} not found`;
	return library as Library;
}

export async function create(username: string): Promise<Library> {
	const library = new libraryModel({ username });
	return library.save();
}

export default { get, create };
