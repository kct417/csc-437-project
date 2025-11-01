import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import reset from './styles/reset.css';
import page from './styles/page.css';

document.body.addEventListener('dark-mode:toggle', (e: Event) => {
	const { checked } = (e as CustomEvent<{ checked: boolean }>).detail;
	document.body.classList.toggle('dark-mode', checked);
});

export class HeaderElement extends LitElement {
	static styles = [reset.styles, page.styles];

	@property({ attribute: 'src-svg' })
	srcSvg?: string;

	@property({ attribute: 'links', type: Array })
	links: Array<[string, string]> = [];

	private toggleDarkMode(e: Event) {
		e.stopPropagation();
		const checked = (e.target as HTMLInputElement).checked;
		const event = new CustomEvent('dark-mode:toggle', {
			bubbles: true,
			composed: true,
			detail: { checked },
		});
		this.dispatchEvent(event);
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
				</div>
			</header>
		`;
	}
}
