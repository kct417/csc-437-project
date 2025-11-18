import { html, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import { Auth, Observer } from '@calpoly/mustang';

import reset from '../styles/reset.css';
import page from '../styles/page.css';
import info from '../styles/info.css';
import card from '../styles/card.css';

import { Bookmark } from './bookmark';

export interface Folder {
	folderName: string;
	description?: string;
	image?: string;
	url?: string;
	bookmarks: Array<Bookmark>;
}

export class FolderElement extends LitElement {
	static styles = [reset.styles, page.styles, info.styles, card.styles];

	_authObserver = new Observer<Auth.Model>(this, 'arcana:auth');
	_user?: Auth.User;

	get authorization(): { Authorization?: string } {
		if (this._user && this._user.authenticated)
			return (
				this._user?.authenticated && {
					Authorization: `Bearer ${
						(this._user as Auth.AuthenticatedUser).token
					}`,
				}
			);
		else return {};
	}

	connectedCallback() {
		super.connectedCallback();
		this._authObserver.observe((auth: Auth.Model) => {
			this._user = auth.user;
			this.hydrate();
		});
	}

	@state()
	folder: Folder = {
		folderName: '',
		image: '/images/folder.png',
		description: '',
		bookmarks: [],
	};

	hydrate() {
		const url = `api/folders/691b0af835345eaa13d74510`;
		fetch(url, { headers: this.authorization })
			.then((res) => res.json())
			.then((json: object) => {
				if (json) {
					this.folder = json as Folder;
					console.log('Folder' + this.folder);
				}
			})
			.catch((error) => {
				console.error('Error loading folder data:', error);
			});
	}

	render() {
		return html`
			<section class="content">
				<div class="entry">
					<img
						src="${this.folder.image || '/images/folder.png'}"
						alt="Folder Image" />
					<div class="entry-info">
						<h2>${this.folder.folderName}</h2>
						<p class="description">${this.folder.description}</p>
						<dl class="details">
							<dt>Entries</dt>
							<dd>${this.folder.bookmarks.length} Bookmarks</dd>
						</dl>
					</div>
				</div>
			</section>
			<section class="content grid">
				${this.folder.bookmarks.map(
					(bookmark) => html`
						<a href="/bookmark.html" class="card">
							<img
								src="${bookmark.image ||
								'/images/bookmark.png'}"
								alt="Bookmark cover" />
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
