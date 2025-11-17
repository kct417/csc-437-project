import { html } from 'lit';
import { state } from 'lit/decorators.js';

import { ItemFormElement } from './item-form';
import { Folder } from './folder';

export class FolderFormElement extends ItemFormElement<Folder> {
	@state() item: Folder = {} as Folder;
	type = 'folders';

	render() {
		return html`
			<form @input=${this.handleInput}>
				<label>
					Folder Name:
					<input
						name="folderName"
						.value=${this.item.folderName || ''} />
				</label>

				<label>
					Description:
					<textarea
						name="description"
						.value=${this.item.description || ''}></textarea>
				</label>

				<label>
					Image URL:
					<input name="image" .value=${this.item.image || ''} />
				</label>

				<div class="form-actions">
					<button type="button" @click=${this.saveItem}>Save</button>
					<button type="button" @click=${this.cancel}>Cancel</button>
				</div>
			</form>
		`;
	}
}
