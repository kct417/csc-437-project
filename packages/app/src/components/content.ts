import { html, LitElement } from 'lit';
import { Auth, Observer } from '@calpoly/mustang';

import reset from '../styles/reset.css';
import page from '../styles/page.css';

export class ContentElement extends LitElement {
	static styles = [reset.styles, page.styles];

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
	}

	render() {
		return html`
			<section>
				<slot name="header"></slot>
				<slot name="content"></slot>
			</section>
		`;
	}
}
