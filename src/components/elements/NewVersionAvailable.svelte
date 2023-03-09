<script lang="ts">
	import { useRegisterSW } from 'virtual:pwa-register/svelte';
	import {
		AlertCircleIcon,
		DownloadIcon,
		CalendarIcon,
	} from 'svelte-feather-icons';

	const { needRefresh, updateServiceWorker } = useRegisterSW();

	const updateSw = () => updateServiceWorker(true);
	const close = () => needRefresh.set(false);
</script>

{#if $needRefresh}
	<div class="card">
		<h3>
			<AlertCircleIcon class="icon-in-text" /> Update available!
		</h3>
		<p>
			New Updates provide you with a better experience, new features and
			sometimes less bugs.
			<br />
			Feel free to check out the
			<a
				href="https://github.com/tametsi/ligas/blob/main/CHANGELOG.md"
				target="_blank"
				rel="noopener noreferrer">CHANGELOG</a
			>
		</p>
		<button class="button success" on:click={updateSw}>
			<DownloadIcon class="icon-in-text" /> Update & Reload
		</button>
		<button class="button warning" on:click={close}>
			<CalendarIcon class="icon-in-text" /> Yeah, yeah...
		</button>
	</div>
{/if}
