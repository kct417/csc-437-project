import { html } from 'lit';
import { state } from 'lit/decorators.js';

import { ItemFormElement } from './item-form';
import { Bookmark } from './bookmark';

export class BookmarkFormElement extends ItemFormElement<Bookmark> {
	@state() item: Bookmark = {} as Bookmark;
	type = 'bookmarks';

	render() {
		return html`
			<form @input=${this.handleInput}>
				<label
					>Title:
					<input
						name="bookmarkName"
						.value=${this.item.bookmarkName || ''}
				/></label>
				<label
					>Description:
					<textarea name="description">
${this.item.description || ''}</textarea
					>
				</label>
				<label
					>Author:
					<input name="author" .value=${this.item.author || ''}
				/></label>
				<button type="button" @click=${this.saveItem}>Save</button>
				<button type="button" @click=${this.cancel}>Cancel</button>
			</form>
		`;
	}
}
