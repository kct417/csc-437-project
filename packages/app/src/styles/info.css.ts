import { css } from 'lit';

const styles = css`
	.content h2 {
		font-family: var(--font-serif);
		color: var(--color-primary);
		font-weight: var(--font-weight-bold);
		margin-bottom: var(--space-sm);
	}

	.description {
		font-size: var(--font-size-md);
		color: var(--color-text);
	}

	.details {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.details dl {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.details dt {
		font-weight: var(--font-weight-semibold);
		color: var(--color-primary);
	}

	.details dd {
		margin-left: var(--space-sm);
		color: var(--color-text);
	}

	.entry {
		display: flex;
		align-items: center;
		gap: var(--space-lg);
	}

	.entry img {
		width: 200px;
		height: 200px;
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-sm);
		object-fit: contain;
		background-color: var(--color-surface-variant);
	}

	.entry-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.entry-info h2 {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
	}

	.entry-info .description {
		font-size: var(--font-size-md);
		color: var(--color-text);
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.meta-item {
		display: flex;
		gap: var(--space-sm);
		font-size: var(--font-size-sm);
		color: var(--color-text);
	}

	.meta-item label {
		font-weight: var(--font-weight-semibold);
		color: var(--color-primary);
	}
`;

export default { styles };
