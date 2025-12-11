import { Types } from 'mongoose';

import { Folder } from './folder';

export interface Library {
	_id: Types.ObjectId;
	username: string;
	folders?: Folder[];
}
