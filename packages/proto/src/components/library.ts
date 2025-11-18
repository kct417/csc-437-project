import { html, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import { Auth, Observer } from '@calpoly/mustang';

import reset from '../styles/reset.css';
import page from '../styles/page.css';
import card from '../styles/card.css';

import { Folder } from './folder';

interface Library {
	username: string;
	folders: Array<Folder>;
}

export class LibraryElement extends LitElement {
	static styles = [reset.styles, page.styles, card.styles];

	@state()
	library: Library = {
		username: '',
		folders: [],
	};

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

	hydrate() {
		const url = `/api/library`;
		fetch(url, { headers: this.authorization })
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
				<a href="folder.html" class="card">
					<img src="/images/folder.png" alt="Folder cover" />
					<div class="card-content">
						<h4>Test</h4>
					</div>
				</a>
				${this.library.folders.map(
					(folder) => html`
						<a href="folder.html" class="card">
							<img
								src="${folder.image || '/images/folder.png'}"
								alt="Folder cover" />
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
