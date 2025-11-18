import { html, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import { Auth, Observer } from '@calpoly/mustang';

import reset from '../styles/reset.css';
import page from '../styles/page.css';
import info from '../styles/info.css';

export interface Bookmark {
	bookmarkName: string;
	image?: string;
	description?: string;
	author?: string;
	chapter?: string;
	page?: number;
	url?: string;
}

export class BookmarkElement extends LitElement {
	static styles = [reset.styles, page.styles, info.styles];

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
	bookmark: Bookmark = {
		bookmarkName: '',
		image: '/images/bookmark.png',
		description: '',
		author: '',
		chapter: '',
		page: 0,
		url: '',
	};

	hydrate() {
		const url = `api/bookmarks/691b0bb235345eaa13d74516`;
		fetch(url, { headers: this.authorization })
			.then((res) => res.json())
			.then((json: object) => {
				if (json) {
					this.bookmark = json as Bookmark;
				}
			})
			.catch((error) => {
				console.error('Error loading bookmark data:', error);
			});
	}

	formatKey(key: string) {
		return key
			.replace(/([A-Z])/g, ' $1')
			.replace(/^./, (c) => c.toUpperCase());
	}

	render() {
		const entries = Object.entries(this.bookmark).filter(
			([key]) => key !== 'image'
		);

		return html`
			<section class="content">
				<div class="entry">
					<img
						src="${this.bookmark.image || '/images/bookmark.png'}"
						alt="Bookmark Image" />
					<div class="entry-info">
						<h2>${this.bookmark.bookmarkName}</h2>
						<dl class="details">
							${entries.map(([key, value]) => {
								const label = this.formatKey(key);
								if (
									value === undefined ||
									value === null ||
									value === ''
								)
									return html`<dt>${label}</dt>
										<dd>N/A</dd>`;
								if (key === 'url')
									return html`
										<dt>${label}</dt>
										<dd>
											<a href="${value}" target="_blank"
												>${value}</a
											>
										</dd>
									`;
								return html`<dt>${label}</dt>
									<dd>${value}</dd>`;
							})}
						</dl>
					</div>
				</div>
			</section>
		`;
	}
}
