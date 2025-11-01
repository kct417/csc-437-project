import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import reset from './styles/reset.css';
import page from './styles/page.css';
import card from './styles/card.css';

interface Folder {
	image: string;
	name: string;
	author: string;
	entries: number;
	url: string;
}

interface Library {
	username: string;
	folders: Array<Folder>;
}

export class LibraryElement extends LitElement {
	static styles = [reset.styles, page.styles, card.styles];

	@property()
	src?: string;

	@state()
	library: Library = {
		username: '',
		folders: [],
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
					this.library = json as Library;
				}
			})
			.catch((error) => {
				console.error('Error loading library data:', error);
			});
	}

	render() {
		return html`
			<section class="content grid">
				${this.library.folders.map(
					(folder) => html`
						<a href="${folder.url}" class="card">
							<img src="${folder.image}" alt="Folder cover" />
							<div class="card-content">
								<h4>${folder.name}</h4>
								<p>${folder.entries} bookmarks</p>
							</div>
						</a>
					`
				)}
			</section>
		`;
	}
}
