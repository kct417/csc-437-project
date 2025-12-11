import { Library, Folder, Bookmark } from 'server/models';

export interface Model {
	library?: Library;
	folder?: Folder;
	bookmark?: Bookmark;
}

export const init: Model = {};
