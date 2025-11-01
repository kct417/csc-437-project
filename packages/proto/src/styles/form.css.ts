import { css } from 'lit';

const styles = css`
	.editor {
		display: grid;
		grid-template-columns: repeat(var(--page-grids, 12), 1fr);
		gap: var(--space-lg);
		padding: var(--space-lg);
		background-color: var(--color-surface);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
		margin: var(--space-lg);
		transition: background-color 0.3s ease, color 0.3s ease;
	}

	.editor-header {
		grid-column: 1 / -1;
		text-align: center;
	}

	.editor-header h2 {
		font-size: var(--font-size-xl);
		color: var(--color-primary);
		margin-bottom: var(--space-md);
	}

	.preview {
		grid-column: span 3;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-sm);
	}

	.preview img.cover {
		width: 100%;
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-sm);
		object-fit: contain;
		background-color: var(
			--color-card-surface
		); /* use card variant so it doesn’t blend with surface */
	}

	.form-section {
		grid-column: span 9;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.field-label {
		font-weight: var(--font-weight-semibold);
		color: var(--color-primary);
	}

	input[type='text'],
	textarea {
		width: 100%;
		padding: var(--space-sm);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		font-family: inherit;
		font-size: var(--font-size-md);
		background-color: var(
			--color-surface
		); /* surface background for form inputs */
		color: var(--color-text);
		transition: background-color 0.3s ease, color 0.3s ease,
			border-color 0.3s ease;
	}

	input[type='text']:focus,
	textarea:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2); /* subtle focus glow */
	}

	.form-actions {
		grid-column: 1 / -1;
		display: flex;
		justify-content: center;
		gap: var(--space-md);
		margin-top: var(--space-lg);
	}
`;

export default { styles };
