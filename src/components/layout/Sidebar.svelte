<script>
	import activePage, { Page } from '../../stores/activePage';
	import {
		HomeIcon,
		Edit2Icon,
		DatabaseIcon,
		CoffeeIcon,
	} from 'svelte-feather-icons';
</script>

<ul>
	<div>
		<li>
			<a href="#main" class:active={$activePage === Page.main}>
				<HomeIcon class="icon-in-text" /> Main
			</a>
		</li>
		<li>
			<a href="#edit" class:active={$activePage === Page.edit}>
				<Edit2Icon class="icon-in-text" /> Edit
			</a>
		</li>
		<li>
			<a href="#export" class:active={$activePage === Page.export}>
				<DatabaseIcon class="icon-in-text" /> Export
			</a>
		</li>
	</div>
	<div>
		<li>
			<a href="#about" class:active={$activePage === Page.about}>
				<CoffeeIcon class="icon-in-text" /> About
			</a>
		</li>
		<!-- svelte-ignore missing-declaration -->
		<li><span class="version">Version: <b>{__APP_VERSION__}</b></span></li>
	</div>
</ul>

<style lang="scss">
	@use '../../scss/abstracts' as a;

	ul {
		list-style: none;

		display: flex;
		justify-content: space-between;
		flex-flow: column nowrap;
		height: 100%;
		width: 100%;

		background-color: var(--clr-bg2);

		border-right: 0.3rem solid var(--clr-accent);

		li a,
		li .version {
			$margin: 0.4rem;

			display: block;
			color: inherit;
			width: calc(100% - $margin * 2);
			height: 100%;

			padding: 0.5rem;
			margin: $margin;
			border-radius: 0.2rem;

			transition: all 0.2s;

			@include a.text-overflow();
		}

		li a {
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

		li .version {
			text-align: center;
			cursor: default;
			font-size: 0.8em;
		}
	}
</style>
