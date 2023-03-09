<script lang="ts">
	import BasePage from '@components/pages/BasePage.svelte';
	import {
		FeatherIcon,
		GithubIcon,
		WatchIcon,
		CpuIcon,
		HeartIcon,
	} from 'svelte-feather-icons';
</script>

<BasePage>
	<h2>About</h2>

	<section>
		<p class="box">LIGAS - Time measurement made easy!</p>
		<p>
			LIGAS is a tool to simplify the measurement
			<WatchIcon class="icon-in-text" />
			and managment
			<CpuIcon class="icon-in-text" />
			of round times during a competition.
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

	<section>
		<!-- svelte-ignore missing-declaration -->
		<p>{__APP_VERSION_STRING__}</p>
	</section>
</BasePage>
