import { html, LitElement } from 'lit';
import { state, property } from 'lit/decorators.js';
import { Events, Auth, Observer } from '@calpoly/mustang';

import reset from '../styles/reset.css.ts';
import page from '../styles/page.css.ts';
import header from '../styles/header.css.ts';

export class HeaderElement extends LitElement {
	static styles = [reset.styles, page.styles, header.styles];

	@property({ attribute: 'src-svg' })
	srcSvg?: string;

	@property({ attribute: 'links', type: Array })
	links: Array<[string, string]> = [];

	private toggleDarkMode(event: Event) {
		event.stopPropagation();
		const checked = (event.target as HTMLInputElement).checked;
		const customEvent = new CustomEvent('dark-mode', {
			bubbles: true,
			composed: true,
			detail: { checked },
		});
		this.dispatchEvent(customEvent);
	}

	static initializeOnce() {
		function toggleDarkMode(page: HTMLElement | null, checked: any) {
			page?.classList.toggle('dark-mode', checked);
		}

		document.body.addEventListener('dark-mode', (event: Event) =>
			toggleDarkMode(
				event.currentTarget as HTMLElement,
				(event as CustomEvent).detail.checked
			)
		);
	}

	_authObserver = new Observer<Auth.Model>(this, 'arcana:auth');

	@state()
	loggedIn = false;

	@state()
	userid?: string;

	connectedCallback() {
		super.connectedCallback();

		this._authObserver.observe((auth: Auth.Model) => {
			const { user } = auth;

			if (user && user.authenticated) {
				this.loggedIn = true;
				this.userid = user.username;
			} else {
				this.loggedIn = false;
				this.userid = undefined;
			}
		});
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
						<ul>
							${this.links.map(
								([label, url]) =>
									html`<li><a href="${url}">${label}</a></li>`
							)}
						</ul>
					</nav>

					<div class="toggle">
						<label for="darkModeToggle">
							<input
								id="darkModeToggle"
								type="checkbox"
								autocomplete="off"
								@change="${this.toggleDarkMode}" />
							<span>Dark Mode</span>
						</label>
					</div>
					${this.loggedIn
						? this.renderSignOutButton()
						: this.renderSignInButton()}
				</div>
			</header>
		`;
	}
}
