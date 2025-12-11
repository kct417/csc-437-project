import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { define, View, History, Form } from '@calpoly/mustang';

import { Msg } from '../messages';
import { Model } from '../model';

import reset from '../styles/reset.css.js';
import page from '../styles/page.css.js';
import card from '../styles/card.css.js';
import { Folder } from 'server/models';

export class LibraryViewElement extends View<Model, Msg> {
	static styles = [reset.styles, page.styles, card.styles];

	static uses = define({
		'mu-form': Form.Element,
	});

	@state()
	get library() {
		return this.model.library;
	}

	@property()
	mode = 'view';

	@state()
	_error?: Error;

	_image?: string;

	constructor() {
		super('arcana:model');
	}

	connectedCallback() {
		super.connectedCallback();
		this.dispatchMessage(['library/request', {}]);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		super.attributeChangedCallback(name, oldValue, newValue);
		if (oldValue !== newValue && newValue) {
			console.log('Library Page:', newValue);
			this.dispatchMessage(['library/request', {}]);
		}
	}

	handleFolderSubmit(event: Form.SubmitEvent<Folder>) {
		const folder = { ...event.detail };
		if (this._image) folder.image = this._image;
		console.log('Adding folder:', event.detail);
		this.dispatchMessage([
			'folder/add',
			{ folder: folder },
			{
				onSuccess: () => {
					this._error = undefined;
					History.dispatch(this, 'history/navigate', {
						href: `/app`,
					});
				},
				onFailure: (err) => {
					this._error = err;
					console.error('Error adding folder', err);
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
		return this.mode === 'add' ? this.renderAdd() : this.renderView();
	}

	renderAdd() {
		const init = {
			folderName: '',
			description: '',
			image: '',
		};

		return html`
			<section class="content grid">
				<mu-form
					.init=${init}
					@mu-form:submit=${this.handleFolderSubmit}>
					${this._error
						? html`<p class="error">${this._error}</p>`
						: ''}
					<dl>
						<dt>Folder Name</dt>
						<dd>
							<input name="folderName" type="text" required />
						</dd>
						<dt>Description</dt>
						<dd>
							<textarea name="description"></textarea>
						</dd>
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
					</dl>
				</mu-form>
			</section>
		`;
	}

	renderView() {
		const { folders } = this.library || {};

		return html`
			<section class="content grid">
				${folders?.map(
					(folder) => html`
						<a href="/app/folders/${folder._id}" class="card">
							<img
								src="${folder.image || '/images/folder.png'}"
								alt="${folder.folderName} folder image" />
							<div class="card-content">
								<h4>${folder.folderName}</h4>
							</div>
						</a>
					`
				)}
			</section>
		`;
	}
}
