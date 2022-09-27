<script lang="ts">
	import checkForUpdate from '@lib/util/checkForUpdate';
	import { onMount } from 'svelte';
	import {
		AlertCircleIcon,
		DownloadIcon,
		CalendarIcon,
	} from 'svelte-feather-icons';

	let small = false;
	let release: {
		browser_download_url?: any;
		prerelease?: boolean;
		tag_name?: string;
		assets?: { browser_download_url: string }[];
	};

	const toggleSize = () => (small = !small);
	const runCheck = async () => {
		release = await checkForUpdate();
		small = false;
	};

	onMount(async () => {
		runCheck();
	});
</script>

<svelte:window on:online={runCheck} />

{#if release}
	<div class="card">
		{#if !small}
			<div>
				<h3>
					<AlertCircleIcon class="icon-in-text" /> Update available!
				</h3>
				<p>
					New Updates provide you with a better experience, new
					features and sometimes less bugs.
					<br />
					Feel free to check out the
					<a
						href="https://github.com/tametsi/ligas/blob/main/CHANGELOG.md"
						target="_blank">CHANGELOG</a
					>.
				</p>
				<a
					class="button success"
					href={release?.assets?.[0]?.browser_download_url ?? '404'}
					target="_blank"
				>
					<DownloadIcon class="icon-in-text" /> Donwload
				</a>
				<button class="button warning" on:click={toggleSize}>
					<CalendarIcon class="icon-in-text" /> Yeah, yeah...
				</button>
			</div>
		{:else}
			<button class="button-icon red" on:click={toggleSize}>
				<CalendarIcon />
			</button>
		{/if}
	</div>
{/if}

<style lang="scss">
	.card {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		width: auto;

		background-color: var(--clr-bg2);
		border-radius: 0.5rem;

		width: auto;
		max-width: 70%;

		div {
			padding: 2rem;
		}

		.red {
			color: lighten($red, 15);
		}
	}
</style>
