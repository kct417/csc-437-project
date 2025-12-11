import { css } from 'lit';

export const styles = css`
	/* ---------- Header Layout ---------- */
	header {
		display: flex;
		grid-column: start / end;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		background-color: var(--color-surface);
		border-bottom: 1px solid var(--color-border);
		padding: var(--space-sm) var(--space-md);
		box-shadow: var(--shadow-sm);
		transition: background-color 0.3s ease, border-color 0.3s ease;
	}

	header ~ * {
		margin: var(--space-sm);
	}

	a[slot='actuator'] {
		color: var(--color-link-inverted);
		cursor: pointer;
	}

	mu-dropdown menu {
		background: var(--dropdown-bg, #fff);
		color: var(--dropdown-fg, #000);
		padding: 0.5rem;
		border-radius: 6px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		list-style: none;
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
`;

export default { styles };
