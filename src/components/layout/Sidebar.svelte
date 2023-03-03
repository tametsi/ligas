<script>
	import {
		HomeIcon,
		Edit2Icon,
		DatabaseIcon,
		CoffeeIcon,
		ActivityIcon,
		BookIcon,
		BookOpenIcon,
		SettingsIcon,
	} from 'svelte-feather-icons';
	import { link } from 'svelte-spa-router';
	import active from 'svelte-spa-router/active';
	import { _ } from '@lib/util/translations';
</script>

<ul>
	<div>
		<li>
			<a href="/" use:link use:active>
				<HomeIcon class="icon-in-text" />
				{$_('main.title')}
			</a>
		</li>
		<li>
			<a href="/edit" use:link use:active>
				<Edit2Icon class="icon-in-text" />
				{$_('edit.title')}
			</a>
		</li>
		<li>
			<a href="/export" use:link use:active>
				<DatabaseIcon class="icon-in-text" />
				{$_('export.title')}
			</a>
		</li>
		<li>
			<a href="/analytics" use:link use:active>
				<ActivityIcon class="icon-in-text" />
				{$_('analytics.title')}
			</a>
		</li>
		<li>
			<a href="/history" use:link use:active>
				<BookOpenIcon class="icon-in-text active-icon" />
				<BookIcon class="icon-in-text inactive-icon" />
				{$_('history.title')}
			</a>
		</li>
	</div>
	<div>
		<li>
			<a href="/settings" use:link use:active>
				<SettingsIcon class="icon-in-text" />
				{$_('settings.title')}
			</a>
		</li>
		<li>
			<a href="/about" use:link use:active>
				<CoffeeIcon class="icon-in-text" />
				{$_('about.title')}
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

			@include text-overflow();
		}

		li a {
			&:hover {
				background-color: var(--clr-bg3);
			}
			&:active {
				letter-spacing: -0.1rem;
			}

			:global(.inactive-icon) {
				display: inline-block;
			}
			:global(.active-icon) {
				display: none;
			}
			// :global() because class will be added by the router
			&:global(.active) {
				background-color: var(--clr-bg3);
				color: var(--clr-accent-light);

				:global(.active-icon) {
					display: inline-block;
				}
				:global(.inactive-icon) {
					display: none;
				}
			}
		}
	}
</style>
