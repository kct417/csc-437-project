import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class TitleElement extends LitElement {
	static styles = [];

	@property({ attribute: 'name' })
	name?: string;

	render() {
		const { name } = this;
		return html`<title>${name}</title>`;
	}
}
