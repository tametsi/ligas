<script lang="ts">
	import Comment from '@components/elements/Comment.svelte';
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
	<h2 class="text-2xl font-bold">{$_('about.title')}</h2>

	<section class="my-2">
		<Comment>{$_('about.app_title')}</Comment>
		<p class="mt-2">
			{$_('about.app_description.0')}
			<WatchIcon class="inline-block" />
			{$_('about.app_description.1')}
			<CpuIcon class="inline-block" />
			{$_('about.app_description.2')}
		</p>
	</section>

	<section class="my-2">
		<h3 class="text-xl font-bold my-2">Code</h3>
		<p>
			{$_('about.open_source')}
			<a
				href="https://github.com/tametsi/ligas/"
				target="_blank"
				rel="noopener noreferrer"
				class="link link-hover link-primary"
			>
				<GithubIcon class="inline-block align-sub" />
				GitHub</a
			>.
		</p>
	</section>

	<section class="my-2">
		<h3 class="text-xl font-bold my-2">{$_('about.libraries')}</h3>
		<ul class="list-[square] list-inside">
			<li>
				<a
					href="https://svelte.dev/"
					target="_blank"
					rel="noopener noreferrer"
					class="link link-hover link-primary"
				>
					Svelte
				</a>
			</li>
			<li>
				<a
					href="https://sass-lang.com/"
					target="_blank"
					rel="noopener noreferrer"
					class="link link-hover link-primary"
				>
					Sass
				</a>
			</li>
			<li>
				<a
					href="https://vitejs.dev/"
					target="_blank"
					rel="noopener noreferrer"
					class="link link-hover link-primary"
				>
					Vite
				</a>
			</li>
			<li>
				<a
					href="http://feathericons.com/"
					target="_blank"
					rel="noopener noreferrer"
					class="link link-hover link-primary"
				>
					<FeatherIcon class="inline-block align-sub" />
					Feather
				</a>
			</li>
		</ul>
	</section>

	<section class="my-2">
		<Comment>
			{$_('about.built_with.0')}
			<span class="text-red-700"><HeartIcon class="inline-block" /></span>
			{$_('about.built_with.1')}
		</Comment>
	</section>

	<section class="my-2">
		<!-- svelte-ignore missing-declaration -->
		<p class="italic font-bold">
			<span class="inline-block delay-1000 hover:rotate-180"
				>{__APP_VERSION_STRING__}</span
			>
		</p>
	</section>
</BasePage>
