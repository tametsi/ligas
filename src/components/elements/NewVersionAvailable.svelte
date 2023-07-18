<script lang="ts">
	import { useRegisterSW } from 'virtual:pwa-register/svelte';
	import { AlertCircle, Download, Calendar } from 'lucide-svelte';

	const { needRefresh, updateServiceWorker } = useRegisterSW();

	const updateSw = () => updateServiceWorker(true);
	const close = () => needRefresh.set(false);
</script>

{#if $needRefresh}
	<div class="card bg-base-100 p-4">
		<div class="card-content">
			<h3 class="card-title">
				<AlertCircle /> Update available!
			</h3>

			<p class="py-2">
				New Updates provide you with a better experience, new features
				and sometimes less bugs.
				<br />
				Feel free to check out the
				<a
					href="https://github.com/tametsi/ligas/blob/main/CHANGELOG.md"
					target="_blank"
					rel="noopener noreferrer"
					class="link link-hover link-primary">CHANGELOG</a
				>
			</p>

			<div class="card-actions">
				<button class="btn btn-primary gap-2" on:click={updateSw}>
					<Download /> Update & Reload
				</button>
				<button class="btn btn-error gap-2" on:click={close}>
					<Calendar /> Yeah, yeah...
				</button>
			</div>
		</div>
	</div>
{/if}
