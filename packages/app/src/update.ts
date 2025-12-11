import { Auth, ThenUpdate, Message } from '@calpoly/mustang';

import { Msg } from './messages';
import { Model } from './model';

import { Library, Folder, Bookmark } from 'server/models';

export default function update(
	message: Msg,
	model: Model,
	user: Auth.User
): Model | ThenUpdate<Model, Msg> {
	const [command, payload, callbacks] = message;
	switch (command) {
		case 'library/request': {
			return [
				{ ...model, library: {} as Library },
				requestLibrary(user).then((library) => [
					'library/load',
					{ library: library },
				]),
			];
		}
		case 'folder/request': {
			const { folderId } = payload;
			return [
				{ ...model, folder: {} as Folder },
				requestFolder(user, folderId).then((folder) => [
					'folder/load',
					{ folder: folder },
				]),
			];
		}
		case 'bookmark/request': {
			const { bookmarkId } = payload;
			return [
				{ ...model, bookmark: {} as Bookmark },
				requestBookmark(user, bookmarkId).then((bookmark) => [
					'bookmark/load',
					{ bookmark: bookmark },
				]),
			];
		}
		case 'library/load': {
			const { library } = payload;
			return { ...model, library };
		}
		case 'folder/load': {
			const { folder } = payload;
			return { ...model, folder };
		}
		case 'bookmark/load': {
			const { bookmark } = payload;
			return { ...model, bookmark };
		}
		case 'folder/add': {
			const { folder } = payload;
			return [
				model,
				addFolder(user, folder, callbacks).then((folder) => [
					'folder/load',
					{ folder },
				]),
			];
		}
		case 'bookmark/add': {
			const { bookmark } = payload;
			return [
				model,
				addBookmark(user, bookmark, callbacks).then((bookmark) => [
					'bookmark/load',
					{ bookmark },
				]),
			];
		}
		case 'folder/edit': {
			const { folder } = payload;
			return [
				model,
				editFolder(user, folder, callbacks).then((folder) => [
					'folder/load',
					{ folder },
				]),
			];
		}
		case 'bookmark/edit': {
			const { bookmark } = payload;
			return [
				model,
				editBookmark(user, bookmark, callbacks).then((bookmark) => [
					'bookmark/load',
					{ bookmark },
				]),
			];
		}
		case 'folder/delete': {
			const { folderId } = payload;
			return [
				model,
				deleteFolder(user, folderId, callbacks).then(() => [
					'library/load',
					{ library: model.library! },
				]),
			];
		}
		case 'bookmark/delete': {
			const { bookmarkId } = payload;
			return [
				model,
				deleteBookmark(user, bookmarkId, callbacks).then(() => [
					'folder/load',
					{ folder: model.folder! },
				]),
			];
		}
		default:
			const unhandled: never = command;
			throw new Error(`Unhandled message "${unhandled}"`);
	}
}

async function requestLibrary(user: Auth.User) {
	return fetch(`/api/users`, {
		headers: Auth.headers(user),
	})
		.then((response: Response) => {
			if (response.status === 200) return response.json();
			throw 'No Response from server';
		})
		.then((json: unknown) => {
			if (json) return json as Library;
			throw 'No JSON in response from server';
		})
		.catch((error) => {
			throw `Error fetching library: ${error}`;
		});
}

async function requestFolder(user: Auth.User, folderId: string) {
	return fetch(`/api/folders/${folderId}`, {
		headers: Auth.headers(user),
	})
		.then((response: Response) => {
			if (response.status === 200) return response.json();
			throw 'No Response from server';
		})
		.then((json: unknown) => {
			if (json) return json as Folder;
			throw 'No JSON in response from server';
		})
		.catch((error) => {
			throw `Error fetching folder: ${error}`;
		});
}

async function requestBookmark(user: Auth.User, bookmarkId: string) {
	return fetch(`/api/bookmarks/${bookmarkId}`, {
		headers: Auth.headers(user),
	})
		.then((response: Response) => {
			if (response.status === 200) return response.json();
			throw 'No Response from server';
		})
		.then((json: unknown) => {
			if (json) return json as Bookmark;
			throw 'No JSON in response from server';
		})
		.catch((error) => {
			throw `Error fetching bookmark: ${error}`;
		});
}

async function addFolder(
	user: Auth.User,
	folder: Folder,
	callbacks: Message.Reactions
) {
	return fetch(`/api/folders`, {
		method: 'POST',
		headers: {
			...Auth.headers(user),
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(folder),
	})
		.then((response: Response) => {
			if (response.status === 201) return response.json();
			throw 'Failed to add folder';
		})
		.then((json: unknown) => {
			if (json) {
				if (callbacks.onSuccess) callbacks.onSuccess();
				return json as Folder;
			}
			throw 'No JSON in response from server';
		})
		.catch((error) => {
			if (callbacks.onFailure) callbacks.onFailure(error);
			throw error;
		});
}

async function addBookmark(
	user: Auth.User,
	bookmark: Bookmark,
	callbacks: Message.Reactions
) {
	console.log('Adding bookmark to server:', bookmark);
	return fetch(`/api/bookmarks`, {
		method: 'POST',
		headers: {
			...Auth.headers(user),
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(bookmark),
	})
		.then((response: Response) => {
			if (response.status === 201) return response.json();
			throw 'Failed to add bookmark';
		})
		.then((json: unknown) => {
			if (json) {
				if (callbacks.onSuccess) callbacks.onSuccess();
				return json as Bookmark;
			}
			throw 'No JSON in response from server';
		})
		.catch((error) => {
			if (callbacks.onFailure) callbacks.onFailure(error);
			throw error;
		});
}

async function editFolder(
	user: Auth.User,
	folder: Folder,
	callbacks: Message.Reactions
) {
	return fetch(`/api/folders/${folder._id}`, {
		method: 'PUT',
		headers: {
			...Auth.headers(user),
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(folder),
	})
		.then((response: Response) => {
			if (response.status === 200) return response.json();
			throw 'Failed to edit folder';
		})
		.then((json: unknown) => {
			if (json) {
				if (callbacks.onSuccess) callbacks.onSuccess();
				return json as Folder;
			}
			throw 'No JSON in response from server';
		})
		.catch((error) => {
			if (callbacks.onFailure) callbacks.onFailure(error);
			throw error;
		});
}

async function editBookmark(
	user: Auth.User,
	bookmark: Bookmark,
	callbacks: Message.Reactions
) {
	return fetch(`/api/bookmarks/${bookmark._id}`, {
		method: 'PUT',
		headers: {
			...Auth.headers(user),
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(bookmark),
	})
		.then((response: Response) => {
			if (response.status === 200) return response.json();
			throw 'Failed to edit bookmark';
		})
		.then((json: unknown) => {
			if (json) {
				if (callbacks.onSuccess) callbacks.onSuccess();
				return json as Bookmark;
			}
			throw 'No JSON in response from server';
		})
		.catch((error) => {
			if (callbacks.onFailure) callbacks.onFailure(error);
			throw error;
		});
}

async function deleteFolder(
	user: Auth.User,
	folderId: string,
	callbacks: Message.Reactions
) {
	return fetch(`/api/folders/${folderId}`, {
		method: 'DELETE',
		headers: Auth.headers(user),
	})
		.then((response: Response) => {
			if (response.status === 204) {
				if (callbacks.onSuccess) callbacks.onSuccess();
				return;
			}
			throw 'Failed to delete folder';
		})
		.catch((error) => {
			if (callbacks.onFailure) callbacks.onFailure(error);
			throw error;
		});
}

async function deleteBookmark(
	user: Auth.User,
	bookmarkId: string,
	callbacks: Message.Reactions
) {
	return fetch(`/api/bookmarks/${bookmarkId}`, {
		method: 'DELETE',
		headers: Auth.headers(user),
	})
		.then((response: Response) => {
			if (response.status === 204) {
				if (callbacks.onSuccess) callbacks.onSuccess();
				return;
			}
			throw 'Failed to delete bookmark';
		})
		.catch((error) => {
			if (callbacks.onFailure) callbacks.onFailure(error);
			throw error;
		});
}
