import { html } from 'lit';
import { state, property } from 'lit/decorators.js';
import {
	define,
	Events,
	Auth,
	Observer,
	View,
	Dropdown,
	Form,
} from '@calpoly/mustang';

import { Model } from '../model.ts';
import { Msg } from '../messages.ts';

import reset from '../styles/reset.css';
import page from '../styles/page.css';
import header from '../styles/header.css';

export class HeaderElement extends View<Model, Msg> {
	static styles = [reset.styles, page.styles, header.styles];

	static uses = define({
		'mu-dropdown': Dropdown.Element,
	});

	@state()
	loggedIn = false;

	@property({ attribute: 'src-svg' })
	srcSvg?: string;

	@property({ attribute: 'links', type: Array })
	links: Array<[string, string]> = [];

	_authObserver = new Observer<Auth.Model>(this, 'arcana:auth');

	constructor() {
		super('arcana:model');
	}

	connectedCallback() {
		super.connectedCallback();

		this._authObserver.observe((auth: Auth.Model) => {
			const { user } = auth;

			if (user && user.authenticated) {
				this.loggedIn = true;
			} else {
				this.loggedIn = false;
			}
		});
	}

	private toggleDarkMode(event: InputEvent) {
		const target = event.target as HTMLInputElement;
		const checked = target.checked;

		Events.relay(event, 'dark-mode', { checked });
	}

	static initializeOnce() {
		console.log(header);

		function toggleDarkMode(page: HTMLElement, checked: boolean) {
			page.classList.toggle('dark-mode', checked);
		}

		document.body.addEventListener('dark-mode', (event) =>
			toggleDarkMode(
				event.currentTarget as HTMLElement,
				(event as CustomEvent).detail?.checked
			)
		);
	}

	renderSignOutButton() {
		return html`
			<button
				@click=${(event: UIEvent) => {
					Events.relay(event, 'auth:message', ['auth/signout']);
				}}>
				Sign Out
			</button>
		`;
	}

	renderSignInButton() {
		return html` <a href="/login.html"> Sign In… </a> `;
	}

	renderAddButton() {
		const path = window.location.pathname;

		if (path.includes('/folders/') && !path.includes('/add')) {
			return html`<a href="${path}/add">Add Bookmark</a>`;
		}

		if (!path.includes('/bookmarks/') && !path.includes('/add')) {
			return html`<a href="${path}/add">Add Folder</a>`;
		}

		return null;
	}

	renderEditButton() {
		const path = window.location.pathname;

		if (path.includes('/folders/') && !path.includes('/edit')) {
			return html`<a href="${window.location.pathname}/edit"
				>Edit Folder</a
			>`;
		}
		if (path.includes('/bookmarks/') && !path.includes('/edit')) {
			return html`<a href="${window.location.pathname}/edit"
				>Edit Bookmark</a
			>`;
		}
		return null;
	}

	render() {
		return html`
			<header>
				<div class="brand">
					<svg class="icon">
						<use href="${this.srcSvg}"></use>
					</svg>
					<div class="brand-name"><a href="/">Arcana</a></div>
				</div>
				<div class="header-right">
					<nav>
						<mu-dropdown>
							<a slot="actuator">Options</a>
							<menu>
                                <li>
                                    ${this.renderAddButton()}
                                </li>
								<li>
									${this.renderEditButton()}
								</li>
								<li>
									<label @change=${this.toggleDarkMode}>
										<input type="checkbox" />
										Dark Mode</label
									>
								</li>
								<li>
									${this.loggedIn ? this.renderSignOutButton() : this.renderSignInButton()}
								</li>
							</menu>
						</mu-dropdown>
					</nav>
			</header>
		`;
	}
}
