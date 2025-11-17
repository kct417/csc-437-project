import { Types } from 'mongoose';

export interface Library {
	_id: Types.ObjectId;
	created?: Date;
	modified?: Date;
}
