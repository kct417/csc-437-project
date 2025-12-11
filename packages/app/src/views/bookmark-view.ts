import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { define, View, History, Form } from '@calpoly/mustang';

import { Msg } from '../messages';
import { Model } from '../model';

import reset from '../styles/reset.css.js';
import page from '../styles/page.css.js';
import info from '../styles/info.css.js';

export class BookmarkViewElement extends View<Model, Msg> {
	static styles = [reset.styles, page.styles, info.styles];

	static uses = define({
		'mu-form': Form.Element,
	});

	@property({ attribute: 'bookmark-id' })
	bookmarkId?: string;

	@property()
	mode = 'view';

	@property()
	_error?: Error;

	_image?: string;

	get src() {
		return `/api/bookmarks/${this.bookmarkId}`;
	}

	get bookmark() {
		return this.model.bookmark;
	}

	constructor() {
		super('arcana:model');
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		super.attributeChangedCallback(name, oldValue, newValue);
		if (name === 'bookmark-id' && oldValue !== newValue && newValue) {
			console.log('Bookmark Page:', newValue);
			this.dispatchMessage([
				'bookmark/request',
				{ bookmarkId: newValue },
			]);
		}
	}

	handleBookmarkSubmit(event: CustomEvent) {
		const bookmark = { ...event.detail };
		if (this._image) bookmark.image = this._image;
		console.log('Submitting bookmark edit:', bookmark);
		this.dispatchMessage([
			'bookmark/edit',
			{ bookmark: bookmark },
			{
				onSuccess: () => {
					this._error = undefined;
					History.dispatch(this, 'history/navigate', {
						href: `/app/bookmarks/${this.bookmarkId}`,
					});
				},
				onFailure: (err) => {
					this._error = err;
					console.error('Error editing bookmark', err);
				},
			},
		]);
	}

	handleBookmarkDelete() {
		const folderId = this.bookmark?.folderId;
		console.log('Deleting bookmark:', this.bookmarkId);
		this.dispatchMessage([
			'bookmark/delete',
			{ bookmarkId: this.bookmarkId! },
			{
				onSuccess: () => {
					this._error = undefined;
					History.dispatch(this, 'history/navigate', {
						href: `/app/folders/${folderId}`,
					});
				},
				onFailure: (err) => {
					this._error = err;
					console.error('Error deleting bookmark', err);
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
		return this.mode === 'edit' ? this.renderEdit() : this.renderView();
	}

	renderEdit() {
		return html`
			<section class="content grid">
				<mu-form
					.init=${this.bookmark}
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
					<button type="submit" @click=${this.handleBookmarkDelete}>
						Delete
					</button>
				</mu-form>
			</section>
		`;
	}

	renderView() {
		const { bookmarkName, image, description, author, chapter, page, url } =
			this.bookmark || {};
		const safeUrl = url
			? url.startsWith('http')
				? url
				: `https://${url}`
			: '';

		return html`
			<section class="content">
				<div class="entry">
					<img
						src="${image || '/images/bookmark.png'}"
						alt="Bookmark Image" />
					<div class="entry-info">
						<h2>${bookmarkName}</h2>
						<p class="description">${description}</p>
						<dl class="details">
							<dt>Author</dt>
							<dd>${author || 'N/A'}</dd>
							<dt>Chapter</dt>
							<dd>${chapter || 0}</dd>
							<dt>Page</dt>
							<dd>${page || 0}</dd>
							<dt>URL</dt>
							<dd>
								<a
									href="${safeUrl}"
									target="_blank"
									rel="noopener noreferrer"
									>${url || 'N/A'}</a
								>
							</dd>
						</dl>
					</div>
				</div>
			</section>
		`;
	}
}
