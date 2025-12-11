import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { define, View, History, Form } from '@calpoly/mustang';

import { Msg } from '../messages';
import { Model } from '../model';

import reset from '../styles/reset.css.js';
import page from '../styles/page.css.js';
import card from '../styles/card.css.js';

export class FolderViewElement extends View<Model, Msg> {
	static styles = [reset.styles, page.styles, card.styles];

	static uses = define({
		'mu-form': Form.Element,
	});

	@property({ attribute: 'folder-id' })
	folderId?: string;

	@property()
	mode = 'view';

	@property()
	_error?: Error;

	_image?: string;

	get src() {
		return `/api/folders/${this.folderId}`;
	}

	get folder() {
		return this.model.folder;
	}

	constructor() {
		super('arcana:model');
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		super.attributeChangedCallback(name, oldValue, newValue);
		if (name === 'folder-id' && oldValue !== newValue && newValue) {
			console.log('Folder Page:', newValue);
			this.dispatchMessage(['folder/request', { folderId: newValue }]);
		}
	}

	handleBookmarkSubmit(event: CustomEvent) {
		const bookmark = { ...event.detail, folderId: this.folderId };
		if (this._image) bookmark.image = this._image;
		console.log('Adding bookmark:', bookmark);
		this.dispatchMessage([
			'bookmark/add',
			{ bookmark: bookmark },
			{
				onSuccess: () => {
					this._error = undefined;
					History.dispatch(this, 'history/navigate', {
						href: `/app/folders/${this.folderId}`,
					});
				},
				onFailure: (err) => {
					this._error = err;
					console.error('Error adding bookmark', err);
				},
			},
		]);
	}

	handleFolderSubmit(event: CustomEvent) {
		const folder = { ...event.detail };
		if (this._image) folder.image = this._image;
		console.log('Editing folder:', folder);
		this.dispatchMessage([
			'folder/edit',
			{ folder: folder },
			{
				onSuccess: () => {
					this._error = undefined;
					History.dispatch(this, 'history/navigate', {
						href: `/app/folders/${this.folderId}`,
					});
				},
				onFailure: (err) => {
					this._error = err;
					console.error('Error editing folder', err);
				},
			},
		]);
	}

	handleFolderDelete() {
		console.log('Deleting folder:', this.folderId);
		this.dispatchMessage([
			'folder/delete',
			{ folderId: this.folderId! },
			{
				onSuccess: () => {
					this._error = undefined;
					History.dispatch(this, 'history/navigate', {
						href: `/app`,
					});
				},
				onFailure: (err) => {
					this._error = err;
					console.error('Error deleting folder', err);
				},
			},
		]);
	}

	handleImageSelected(files: FileList) {
		if (files && files.length) {
			const reader = new Promise((resolve, reject) => {
				const fr = new FileReader();
				fr.onload = () => resolve(fr.result);
				fr.onerror = (err) => reject(err);
				fr.readAsDataURL(files[0]);
			});

			reader.then((result: unknown) => {
				this._image = result as string;
			});
		}
	}

	render() {
		return this.mode === 'add'
			? this.renderAdd()
			: this.mode === 'edit'
			? this.renderEdit()
			: this.renderView();
	}

	renderAdd() {
		const init = {
			bookmarkName: '',
			image: '',
			description: '',
			author: '',
			chapter: '',
			page: 0,
			url: '',
		};

		return html`
			<section class="content grid">
				<mu-form
					.init=${init}
					@mu-form:submit=${this.handleBookmarkSubmit}>
					${this._error
						? html`<p class="error">${this._error}</p>`
						: ''}

					<dl>
						<dt>Bookmark Name</dt>
						<dd>
							<input name="bookmarkName" type="text" required />
						</dd>

						<dt>Description</dt>
						<dd><textarea name="description"></textarea></dd>

						<dt>Author</dt>
						<dd><input name="author" type="text" /></dd>

						<dt>Chapter</dt>
						<dd><input name="chapter" type="text" /></dd>

						<dt>Page</dt>
						<dd><input name="page" type="number" min="0" /></dd>

						<dt>Image</dt>
						<dd>
							<input
								type="file"
								@change=${(e: InputEvent) => {
									const target = e.target as HTMLInputElement;
									const files = target.files;
									if (files && files.length) {
										this.handleImageSelected(files);
									}
								}} />
						</dd>

						<dt>URL</dt>
						<dd><input name="url" type="url" /></dd>
					</dl>
				</mu-form>
			</section>
		`;
	}

	renderEdit() {
		return html`
			<section class="content grid">
				<mu-form
					.init=${this.folder}
					@mu-form:submit=${this.handleFolderSubmit}>
					${this._error
						? html`<p class="error">${this._error}</p>`
						: ''}

					<dl>
						<dt>Folder Name</dt>
						<dd>
							<input name="folderName" type="text" required="" />
						</dd>

						<dt>Description</dt>
						<dd><textarea name="description"></textarea></dd>

						<dt>Image</dt>
						<dd>
							<input
								type="file"
								@change=${(e: InputEvent) => {
									const target = e.target as HTMLInputElement;
									const files = target.files;
									if (files && files.length) {
										this.handleImageSelected(files);
									}
								}} />
						</dd>

						<dt>URL</dt>
						<dd><input name="url" type="url" /></dd>
					</dl>
					<button type="submit" @click=${this.handleFolderDelete}>
						Delete
					</button>
				</mu-form>
			</section>
		`;
	}

	renderView() {
		const { image, folderName, description, bookmarks } = this.folder || {};

		return html`
			<section class="content">
				<div class="entry">
					<img
						src="${image || '/images/folder.png'}"
						alt="Folder Image" />
					<div class="entry-info">
						<h2>${folderName}</h2>
						<p class="description">${description}</p>
						<p>
							${bookmarks?.length || 0}
							${bookmarks?.length === 1
								? 'Bookmark'
								: 'Bookmarks'}
						</p>
					</div>
				</div>
			</section>
			<section class="content grid">
				${bookmarks?.map(
					(bookmark) => html`
						<a href="/app/bookmarks/${bookmark?._id}" class="card">
							<img
								src="${bookmark.image ||
								'/images/bookmark.png'}"
								alt="${bookmark.bookmarkName} bookmark image" />
							<div class="card-content">
								<h4>${bookmark.bookmarkName}</h4>
								<p>${bookmark.author}</p>
							</div>
						</a>
					`
				)}
			</section>
		`;
	}
}
