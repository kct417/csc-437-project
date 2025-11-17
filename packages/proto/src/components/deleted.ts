import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { Auth, Observer } from '@calpoly/mustang';

import reset from '../styles/reset.css';
import page from '../styles/page.css';
import button from '../styles/button.css.ts';

interface DeletedItem {
	name: string;
}

export class DeletedElement extends LitElement {
	static styles = [reset.styles, page.styles, button.styles];

	_authObserver = new Observer<Auth.Model>(this, 'arcana:auth');
	_user?: Auth.User;

	get authorization() {
		return (
			this._user?.authenticated && {
				Authorization: `Bearer ${
					(this._user as Auth.AuthenticatedUser).token
				}`,
			}
		);
	}

	connectedCallback() {
		super.connectedCallback();
		this._authObserver.observe((auth: Auth.Model) => {
			this._user = auth.user;
		});
		if (this.src) this.hydrate(this.src);
	}

	@property()
	src?: string;

	@state()
	deletedFolders: Array<DeletedItem> = [];

	@state()
	deletedBookmarks: Array<DeletedItem> = [];

	private restoreFolder(index: number) {
		console.log(`Restoring folder: ${this.deletedFolders[index].name}`);
	}

	private restoreBookmark(index: number) {
		console.log(`Restoring bookmark: ${this.deletedBookmarks[index].name}`);
	}

	private clearAllDeleted() {
		console.log('Clearing all deleted items');
	}

	hydrate(src: string) {
		fetch(src)
			.then((res) => res.json())
			.then((json: object) => {
				if (json) {
					this.deletedFolders = json as Array<DeletedItem>;
					this.deletedBookmarks = json as Array<DeletedItem>;
				}
			})
			.catch((error) => {
				console.error('Error loading folder data:', error);
			});
	}

	render() {
		return html`
			<main class="content">
				<section>
					<h2>Deleted Folders</h2>
					<ul>
						${this.deletedFolders.map(
							(folder, i) => html`
								<li>
									<span>${folder.name}</span>
									<button
										class="primary small"
										@click=${() => this.restoreFolder(i)}>
										Restore
									</button>
								</li>
							`
						)}
					</ul>
				</section>
				<section>
					<h2>Deleted Bookmarks</h2>
					<ul>
						${this.deletedBookmarks.map(
							(bookmark, i) => html`
								<li>
									<span>${bookmark.name}</span>
									<button
										class="primary small"
										@click=${() => this.restoreBookmark(i)}>
										Restore
									</button>
								</li>
							`
						)}
					</ul>
				</section>
				<div>
					<button class="danger" @click=${this.clearAllDeleted}>
						Clear All Deleted
					</button>
				</div>
			</main>
		`;
	}
}
