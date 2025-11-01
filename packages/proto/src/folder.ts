import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import reset from './styles/reset.css';
import page from './styles/page.css';
import info from './styles/info.css';
import card from './styles/card.css';

interface Detail {
	key: string;
	value: string;
}

interface Metadata {
	key: string;
	value: string;
}

interface Bookmark {
	name: string;
	author: string;
	image: string;
	url: string;
}

interface Folder {
	image: string;
	name: string;
	description: string;
	details: Array<Detail>;
	metadata: Array<Metadata>;
	bookmarks: Array<Bookmark>;
}

export class FolderElement extends LitElement {
	static styles = [reset.styles, page.styles, info.styles, card.styles];

	@property()
	src?: string;

	@state()
	folder: Folder = {
		image: '/images/folder.png',
		name: '',
		description: '',
		details: [],
		metadata: [],
		bookmarks: [],
	};

	connectedCallback() {
		super.connectedCallback();
		if (this.src) this.hydrate(this.src);
	}

	hydrate(src: string) {
		fetch(src)
			.then((res) => res.json())
			.then((json: object) => {
				if (json) {
					this.folder = json as Folder;
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
						<h2>${this.folder.name}</h2>
						<p class="description">${this.folder.description}</p>
						<dl class="details">
							<dt>Entries</dt>
							<dd>${this.folder.bookmarks.length} Bookmarks</dd>
							${this.folder.details.map(
								(detail) => html`
									<dt>${detail.key}</dt>
									<dd>${detail.value}</dd>
								`
							)}
						</dl>
					</div>
				</div>
				<div class="meta">
					${this.folder.metadata.map(
						(meta) => html`
							<div class="meta-item">
								<label>${meta.key}:</label> ${meta.value}
							</div>
						`
					)}
				</div>
			</section>
			<section class="content grid">
				${this.folder.bookmarks.map(
					(bookmark) => html`
						<a href="${bookmark.url}" class="card">
							<img src="${bookmark.image}" alt="Bookmark cover" />
							<div class="card-content">
								<h4>${bookmark.name}</h4>
								<p>${bookmark.author}</p>
							</div>
						</a>
					`
				)}
			</section>
		`;
	}
}
