<script>
	import activePage, { Page } from '../stores/activePage';
</script>

<ul>
	<div>
		<li>
			<a href="#main" class:active={$activePage === Page.main}>
				🏃 Main
			</a>
		</li>
	</div>
	<div>
		<li>
			<a href="#about" class:active={$activePage === Page.about}>
				🐸 About
			</a>
		</li>
	</div>
</ul>

<style lang="scss">
	ul {
		list-style: none;

		display: flex;
		justify-content: space-between;
		flex-flow: column nowrap;
		height: 100%;
		width: 100%;

		background-color: var(--clr-bg2);

		border-right: 0.3rem solid var(--clr-accent);

		li a {
			$margin: 0.4rem;

			display: block;
			color: inherit;
			width: calc(100% - $margin * 2);
			height: 100%;

			padding: 0.5rem;
			margin: $margin;
			border-radius: 0.2rem;

			transition: all 0.2s;
			&:hover {
				background-color: var(--clr-bg3);
			}
			&:active {
				letter-spacing: -0.1rem;
			}

			&.active {
				background-color: var(--clr-bg3);
				color: var(--clr-accent-light);
			}
		}
	}
</style>
