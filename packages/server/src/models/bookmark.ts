import { Types } from 'mongoose';

export interface Bookmark {
	_id: Types.ObjectId;
	username: string;
	folderId: string;
	bookmarkName: string;
	image?: string;
	description?: string;
	author?: string;
	chapter?: string;
	page?: number;
	url?: string;
}
