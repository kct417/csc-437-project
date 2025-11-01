import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import reset from './styles/reset.css';
import page from './styles/page.css';
import button from './styles/button.css';
import formStyles from './styles/form.css';

export class AddEditItemForm extends LitElement {
	static styles = [
		reset.styles,
		page.styles,
		button.styles,
		formStyles.styles,
	];

	@property({ type: String }) srcImage: string = '/images/folder.png';

	@state() title: string = '';
	@state() description: string = '';
	@state() notes: string = '';

	private handleInput(e: Event) {
		const target = e.target as HTMLInputElement | HTMLTextAreaElement;
		if (!target.name) return;

		switch (target.name) {
			case 'title':
				this.title = target.value;
				break;
			case 'description':
				this.description = target.value;
				break;
			case 'notes':
				this.notes = target.value;
				break;
		}
	}

	private editImage() {
		this.dispatchEvent(
			new CustomEvent('edit-image', { bubbles: true, composed: true })
		);
	}

	private cancelForm() {
		this.dispatchEvent(
			new CustomEvent('cancel-form', { bubbles: true, composed: true })
		);
	}

	private saveEntity() {
		this.dispatchEvent(
			new CustomEvent('save-entity', {
				detail: {
					title: this.title,
					description: this.description,
					notes: this.notes,
				},
				bubbles: true,
				composed: true,
			})
		);
	}

	private deleteEntity() {
		this.dispatchEvent(
			new CustomEvent('delete-entity', { bubbles: true, composed: true })
		);
	}

	render() {
		return html`
			<section class="content">
				<header>
					<h2>Add / Edit Item</h2>
				</header>

				<div class="entry">
					<img src="${this.srcImage}" alt="Preview image" />
					<button
						type="button"
						class="secondary"
						@click="${this.editImage}">
						Edit Image
					</button>
				</div>

				<form class="entry" @input="${this.handleInput}">
					<label class="field">
						<span class="field-label">Title</span>
						<input
							type="text"
							name="title"
							placeholder="Enter title"
							.value="${this.title}" />
					</label>

					<label class="field">
						<span class="field-label">Description</span>
						<textarea
							name="description"
							rows="3"
							placeholder="Enter description">
${this.description}</textarea
						>
					</label>

					<label class="field">
						<span class="field-label">Notes</span>
						<textarea
							name="notes"
							rows="3"
							placeholder="Additional notes">
${this.notes}</textarea
						>
					</label>

					<div class="form-actions">
						<button
							type="button"
							class="secondary"
							@click="${this.cancelForm}">
							Cancel
						</button>
						<button
							type="button"
							class="primary"
							@click="${this.saveEntity}">
							Save
						</button>
						<button
							type="button"
							class="danger"
							@click="${this.deleteEntity}">
							Delete
						</button>
					</div>
				</form>
			</section>
		`;
	}
}
