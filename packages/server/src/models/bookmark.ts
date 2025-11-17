import { Types } from 'mongoose';

export interface Bookmark {
	_id: Types.ObjectId;
	folderId: Types.ObjectId;
	bookmarkName: string;
	image?: string;
	description?: string;
	author?: string;
	chapter?: string;
	page?: number;
	url?: string;
	created?: Date;
	modified?: Date;
}
