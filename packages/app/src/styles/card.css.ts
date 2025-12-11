import { css } from 'lit';

const styles = css`
	/* ---------- Grid Layout ---------- */
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: var(--space-lg);
		padding: var(--space-lg);
		justify-content: center;
		justify-items: center;
		width: 100%;
		box-sizing: border-box;
	}

	/* ---------- Card ---------- */
	.card {
		display: flex;
		flex-direction: column;
		background-color: var(--color-card-surface);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-md);
		overflow: hidden;
		width: 100%;
		max-width: 280px; /* prevent cards from being too wide */
		aspect-ratio: 3 / 4;
		text-decoration: none;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
	}

	/* ---------- Card Image ---------- */
	.card img {
		width: 100%;
		height: auto;
		object-fit: cover;
		box-shadow: var(--shadow-sm);
	}

	/* ---------- Card Content ---------- */
	.card-content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		padding: var(--space-md);
		gap: var(--space-sm);
	}

	.card-content h4 {
		font-size: var(--font-size-md);
		font-weight: var(--font-weight-semibold);
		color: var(--color-primary);
		margin: 0;
	}

	.card-content p {
		font-size: var(--font-size-sm);
		color: var(--color-text);
		margin: 0;
	}
`;

export default { styles };
