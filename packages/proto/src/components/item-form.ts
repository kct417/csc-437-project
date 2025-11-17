import { LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { Auth, Observer } from '@calpoly/mustang';

export abstract class ItemFormElement<T> extends LitElement {
	@state() protected _user?: Auth.User;
	_authObserver = new Observer<Auth.Model>(this, 'arcana:auth');

	@property({ type: Object })
	item!: T;

	@property({ type: String })
	type: string = '';

	connectedCallback() {
		super.connectedCallback();
		this._authObserver.observe((auth) => {
			this._user = auth.user;
		});
	}

	protected get authorization() {
		return (
			this._user?.authenticated && {
				Authorization: `Bearer ${
					(this._user as Auth.AuthenticatedUser).token
				}`,
			}
		);
	}

	protected handleInput(event: Event) {
		const target = event.target as HTMLInputElement | HTMLTextAreaElement;
		if (!target.name || !this.item) return;
		(this.item as any)[target.name] = target.value;
		this.requestUpdate();
	}

	protected async saveItem() {
		try {
			console.log(this.type);
			const response = await fetch(`/api/${this.type}`, {
				method: 'POST',
				headers: {
					...this.authorization,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(this.item),
			});

			if (!response.ok) throw `Failed to save item`;

			const newItem = await response.json();
			this.dispatchEvent(
				new CustomEvent('item-saved', {
					detail: newItem,
					bubbles: true,
					composed: true,
				})
			);
		} catch (err) {
			console.error(err);
		}
	}

	protected cancel() {
		this.dispatchEvent(
			new CustomEvent('cancel-form', { bubbles: true, composed: true })
		);
	}

	abstract render(): unknown;
}
