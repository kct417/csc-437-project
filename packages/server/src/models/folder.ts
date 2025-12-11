import { Types } from 'mongoose';

import { Bookmark } from './bookmark';

export interface Folder {
	_id: Types.ObjectId;
	username: string;
	folderName: string;
	description?: string;
	image?: string;
	url?: string;
	bookmarks?: Bookmark[];
}
