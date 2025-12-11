import { Message } from '@calpoly/mustang';

import { Library, Folder, Bookmark } from 'server/models';

export type Msg =
	| ['library/request', {}]
	| ['folder/request', { folderId: string }]
	| ['bookmark/request', { bookmarkId: string }]
	| ['library/load', { library: Library }]
	| ['folder/load', { folder: Folder }]
	| ['bookmark/load', { bookmark: Bookmark }]
	| ['folder/add', { folder: Folder }, Message.Reactions]
	| ['bookmark/add', { bookmark: Bookmark }, Message.Reactions]
	| ['folder/edit', { folder: Folder }, Message.Reactions]
	| ['bookmark/edit', { bookmark: Bookmark }, Message.Reactions]
	| ['folder/delete', { folderId: string }, Message.Reactions]
	| ['bookmark/delete', { bookmarkId: string }, Message.Reactions];
