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

	/* ---------- Header Layout ---------- */
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: var(--color-surface);
		border-bottom: 1px solid var(--color-border);
		padding: var(--space-sm) var(--space-md);
		height: 80px; /* slightly taller header */
		box-shadow: var(--shadow-sm);
		transition: background-color 0.3s ease, border-color 0.3s ease;
	}

	body.dark-mode header {
		background-color: var(--color-bg);
		border-color: var(--color-border);
	}

	/* ---------- Brand ---------- */
	.brand {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.brand .icon {
		width: 36px;
		height: 36px;
		fill: var(--color-primary); /* bluish theme */
	}

	.brand-name a {
		font-family: var(--font-serif);
		font-weight: var(--font-weight-bold);
		font-size: var(--font-size-xxl); /* larger title */
		color: var(--color-primary); /* bluish theme */
	}

	/* ---------- Header Right Section ---------- */
	.header-right {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		font-size: var(--font-size-md);
		color: var(--color-text);
		font-weight: var(--font-weight-semibold);
	}

	nav ul {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		list-style: none;
		padding: 0;
		margin: 0;
	}

	/* ---------- Dark Mode Toggle ---------- */
	.toggle {
		display: flex;
		align-items: center;
	}

	.toggle label {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		cursor: pointer;
	}

	input[type='checkbox'] {
		accent-color: var(--color-primary);
		cursor: pointer;
		width: 1rem;
		height: 1rem;
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
