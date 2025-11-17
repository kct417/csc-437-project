import { Types } from 'mongoose';

export interface Folder {
	_id: Types.ObjectId;
	userId: Types.ObjectId;
	folderName: string;
	description?: string;
	image?: string;
	url?: string;
	created?: Date;
	modified?: Date;
}
