<script lang="ts">
	import { Page } from '@stores/activePage';
	import {
		FeatherIcon,
		GithubIcon,
		WatchIcon,
		DatabaseIcon,
		HeartIcon,
	} from 'svelte-feather-icons';
	import BasePage from '@components/pages/BasePage.svelte';
</script>

<BasePage page={Page.about}>
	<h2>About</h2>

	<section>
		<p class="box">LIGAS - Time measurement made easy!</p>
		<p>
			LIGAS let's you easily measure the round times
			<WatchIcon class="icon-in-text" />
			of various runners by clicking on them. Export the data
			<DatabaseIcon class="icon-in-text" />
			at the end and you're finished!
		</p>
	</section>

	<section>
		<h3>Code</h3>
		<p>
			This project is open source. The code can be found on
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
		<h3>Libraries</h3>
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
			Built with
			<span class="red"><HeartIcon class="icon-in-text" /></span>
			and TypeScript
		</p>
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
