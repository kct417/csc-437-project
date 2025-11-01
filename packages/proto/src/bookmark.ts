import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import reset from './styles/reset.css';
import page from './styles/page.css';
import info from './styles/info.css';

interface Detail {
	key: string;
	value: string;
}

interface Metadata {
	key: string;
	value: string;
}

interface Bookmark {
	image: string;
	name: string;
	description: string;
	author: string;
	chapter?: number | string;
	page: number;
	details: Array<Detail>;
	metadata: Array<Metadata>;
	url?: string;
}

export class BookmarkElement extends LitElement {
	static styles = [reset.styles, page.styles, info.styles];

	@property()
	src?: string;

	@state()
	bookmark: Bookmark = {
		image: '/images/bookmark.png',
		name: '',
		description: '',
		author: '',
		chapter: 0,
		page: 0,
		details: [],
		metadata: [],
		url: '',
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
					this.bookmark = json as Bookmark;
				}
			})
			.catch((error) => {
				console.error('Error loading bookmark data:', error);
			});
	}

	render() {
		return html`
			<section class="content">
				<div class="entry">
					<img
						src="${this.bookmark.image || '/images/bookmark.png'}"
						alt="Bookmark Image" />
					<div class="entry-info">
						<h2>${this.bookmark.name}</h2>
						<p class="description">${this.bookmark.description}</p>
						<dl class="details">
							<dt>Author</dt>
							<dd>${this.bookmark.author}</dd>
							<dt>Chapter</dt>
							<dd>${this.bookmark.chapter || 'N/A'}</dd>
							<dt>Page</dt>
							<dd>${this.bookmark.page}</dd>
							${this.bookmark.details.map(
								(detail) => html`
									<dt>${detail.key}</dt>
									<dd>${detail.value}</dd>
								`
							)}
						</dl>
					</div>
				</div>
				<div class="meta">
					${this.bookmark.metadata.map(
						(meta) => html`
							<div class="meta-item">
								<label>${meta.key}:</label> ${meta.value}
							</div>
						`
					)}
				</div>
			</section>
		`;
	}
}
