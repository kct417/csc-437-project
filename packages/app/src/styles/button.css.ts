import { css } from 'lit';

const styles = css`
	button {
		padding: 0.5rem 1rem;
		border-radius: var(--radius-md);
		border: none;
		cursor: pointer;
		font-weight: var(--font-weight-semibold);
		transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
	}

	/* ---------- Primary Button ---------- */
	button.primary {
		background-color: var(--color-primary);
		color: var(--color-text-inverted);
	}

	button.primary:hover {
		background-color: var(--color-primary-hover);
	}

	/* ---------- Secondary Button ---------- */
	button.secondary {
		background-color: var(--color-secondary);
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}

	button.secondary:hover {
		background-color: var(--color-surface-variant);
	}

	/* ---------- Danger Button ---------- */
	button.danger {
		background-color: var(--color-danger);
		color: var(--color-text-inverted);
	}

	button.danger:hover {
		background-color: var(--color-danger-hover);
	}

	/* ---------- Small Buttons ---------- */
	button.small {
		font-size: var(--font-size-sm);
		padding: 0.25rem 0.5rem;
	}
`;

export default { styles };
