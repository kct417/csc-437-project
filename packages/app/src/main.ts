import { html } from 'lit';
import { Auth, History, Switch, Store, define } from '@calpoly/mustang';

import { Msg } from './messages';
import { Model, init } from './model';
import update from './update';

import { ContentElement } from './components/content';
import { HeaderElement } from './components/header';
import { LibraryViewElement } from './views/library-view';
import { FolderViewElement } from './views/folder-view';
import { BookmarkViewElement } from './views/bookmark-view';

const routes = [
	{
		auth: 'protected',
		path: '/app/bookmarks/:bookmarkId/edit',
		view: (params: Switch.Params) =>
			html`<bookmark-view
				bookmark-id=${params.bookmarkId}
				mode="edit"></bookmark-view>`,
	},
	{
		auth: 'protected',
		path: '/app/bookmarks/:bookmarkId',
		view: (params: Switch.Params) =>
			html`<bookmark-view
				bookmark-id=${params.bookmarkId}></bookmark-view>`,
	},
	{
		auth: 'protected',
		path: '/app/folders/:folderId/add',
		view: (params: Switch.Params) =>
			html`<folder-view
				folder-id=${params.folderId}
				mode="add"></folder-view>`,
	},
	{
		auth: 'protected',
		path: '/app/folders/:folderId/edit',
		view: (params: Switch.Params) =>
			html`<folder-view
				folder-id=${params.folderId}
				mode="edit"></folder-view>`,
	},
	{
		auth: 'protected',
		path: '/app/folders/:folderId',
		view: (params: Switch.Params) =>
			html`<folder-view folder-id=${params.folderId}></folder-view>`,
	},
	{
		auth: 'protected',
		path: '/app/add',
		view: () => html`<library-view mode="add"></library-view>`,
	},
	{
		auth: 'protected',
		path: '/app/edit',
		view: () => html`<library-view mode="edit"></library-view>`,
	},
	{
		auth: 'protected',
		path: '/app',
		view: () => html`<library-view></library-view>`,
	},
	{
		path: '/',
		redirect: '/app',
	},
];

define({
	'mu-auth': Auth.Provider,
	'mu-history': History.Provider,
	'mu-switch': class AppSwitch extends Switch.Element {
		constructor() {
			super(routes, 'arcana:history', 'arcana:auth');
		}
	},
	'mu-store': class AppStore extends Store.Provider<Model, Msg> {
		constructor() {
			super(update, init, 'arcana:auth');
		}
	},
	'content-element': ContentElement,
	'header-element': HeaderElement,
	'library-view': LibraryViewElement,
	'folder-view': FolderViewElement,
	'bookmark-view': BookmarkViewElement,
});

HeaderElement.initializeOnce();
