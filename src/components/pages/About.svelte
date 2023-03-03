<script lang="ts">
	import BasePage from '@components/pages/BasePage.svelte';
	import {
		FeatherIcon,
		GithubIcon,
		WatchIcon,
		CpuIcon,
		HeartIcon,
	} from 'svelte-feather-icons';
	import { _ } from '@lib/util/translations';
</script>

<BasePage>
	<h2>{$_('about.title')}</h2>

	<section>
		<p class="box">{$_('about.app_title')}</p>
		<p>
			{$_('about.app_description.0')}
			<WatchIcon class="icon-in-text" />
			{$_('about.app_description.1')}
			<CpuIcon class="icon-in-text" />
			{$_('about.app_description.2')}
		</p>
	</section>

	<section>
		<h3>Code</h3>
		<p>
			{$_('about.open_source')}
			<a
				href="https://github.com/tametsi/ligas/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<GithubIcon />
				GitHub</a
			>.
		</p>
	</section>

	<section>
		<h3>{$_('about.libraries')}</h3>
		<ul>
			<li>
				<a
					href="https://svelte.dev/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Svelte
				</a>
			</li>
			<li>
				<a
					href="https://sass-lang.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Sass
				</a>
			</li>
			<li>
				<a
					href="https://vitejs.dev/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Vite
				</a>
			</li>
			<li>
				<a
					href="http://feathericons.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FeatherIcon />
					Feather
				</a>
			</li>
		</ul>
	</section>

	<section>
		<p class="box space">
			{$_('about.built_with.0')}
			<span class="red"><HeartIcon class="icon-in-text" /></span>
			{$_('about.built_with.1')}
		</p>
	</section>

	<section>
		<!-- svelte-ignore missing-declaration -->
		<p>{__APP_VERSION_STRING__}</p>
	</section>
</BasePage>

<style lang="scss">
	section {
		margin: 0.4rem 0;

		.box {
			display: inline-block;
			margin-left: 1.4rem;
			margin-bottom: 1rem;
			padding: 1rem 2rem;

			border-radius: 0 0.4rem 0.4rem 0;
			border-left: 0.3rem solid var(--clr-accent);
			background-color: var(--clr-bg2);

			&.space {
				margin-top: 2rem;
			}

			.red {
				color: #b82525;
			}
		}
	}
</style>
