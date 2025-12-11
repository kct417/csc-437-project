import { css } from 'lit';

const styles = css`
	/* ---------- General Page Layout ---------- */
	body {
		background-color: var(--color-bg);
		color: var(--color-text);
		font-family: var(--font-sans);
		transition: background-color 0.3s ease, color 0.3s ease;
	}

	a {
		color: var(--color-primary);
		text-decoration: none;
		transition: color 0.2s ease;
	}
	a:hover {
		color: var(--color-primary-hover);
	}

	/* ---------- Page Content Wrapper ---------- */
	.content {
		display: flex;
		flex-direction: column;
		background-color: var(--color-surface);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
		padding: var(--space-lg);
		margin: var(--space-lg) auto;
		gap: var(--space-lg);
		max-width: 1200px;
		transition: background-color 0.3s ease, color 0.3s ease;
	}

	body.dark-mode .content {
		background-color: var(--color-surface);
		color: var(--color-text);
	}

	/* ---------- Grid Inside Content ---------- */
	.content .grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: var(--space-lg);
		justify-content: center;
		justify-items: center;
		width: 100%;
	}
`;

export default { styles };
