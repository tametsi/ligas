<script lang="ts">
	import { Page } from '@stores/activePage';
	import BasePage from '@components/pages/BasePage.svelte';
	import { onMount } from 'svelte';
	import activeRun from '@stores/activeRun';
	import FormItem from '@components/elements/FormItem.svelte';
	import type Runner from '@lib/runner';

	let c: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let selectedRunner: Runner;
	let xIntervallLenght: number, yCanvasHeight: number;

	function drawCurve() {
		ctx.beginPath();
		selectedRunner.rounds.all.forEach((value, index) => {
			ctx.moveTo(
				index * xIntervallLenght,
				yCanvasHeight -
					(selectedRunner.rounds.all[index] /
						Math.max(...selectedRunner.rounds.all)) *
						yCanvasHeight
			);
			ctx.lineTo(
				(index + 1) * xIntervallLenght,
				yCanvasHeight -
					(selectedRunner.rounds.all[index + 1] /
						Math.max(...selectedRunner.rounds.all)) *
						yCanvasHeight
			);
		});
		ctx.stroke();
		ctx.fill();
	}

	function canvasSetup() {
		ctx = c.getContext('2d');
		ctx.strokeStyle = '#1ca8b6';
		ctx.lineWidth = 3;
		xIntervallLenght = c.width / (selectedRunner.rounds.all.length - 1);
		yCanvasHeight = c.height;

		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		drawCurve();
	}

	onMount(() => {
		canvasSetup();
	});
</script>

<BasePage page={Page.analytics}>
	<form on:submit|preventDefault>
		<figure>
			<figcaption>Stats</figcaption>
			<FormItem name="Select Runner">
				<select
					id="runers"
					bind:value={selectedRunner}
					on:change={canvasSetup}
				>
					{#each $activeRun.runners as runner}
						<option value={runner}>{runner.name}</option>
					{/each}
				</select>
			</FormItem>
		</figure>
	</form>

	<table class="thin">
		<tbody>
			<tr>
				<td>Name</td>
				<td>{selectedRunner?.name ?? '-'}</td>
			</tr>
			<tr>
				<td>Alias</td>
				<td>{selectedRunner?.alias ?? '-'}</td>
			</tr>
			<tr>
				<td>Rounds</td>
				<td>{selectedRunner?.rounds?.all?.length ?? '-'}</td>
			</tr>
			<tr>
				<td>Distance</td>
				<td>{selectedRunner?.distance ?? '-'}</td>
			</tr>
			<tr>
				<td>Avarage Roundtime</td>
				<td
					>{Math.round(selectedRunner?.rounds?.averageTime ?? 0) /
						1000}s</td
				>
			</tr>
			<tr>
				<td>Fastest Round</td>
				<td
					>{Math.min(...(selectedRunner?.rounds?.all ?? [0])) /
						1000}s</td
				>
			</tr>
			<tr>
				<td>Slowest Round</td>
				<td
					>{Math.max(...(selectedRunner?.rounds?.all ?? [0])) /
						1000}s</td
				>
			</tr>
		</tbody>
	</table>

	<canvas bind:this={c} height="500" width="1000" />
</BasePage>

<style lang="scss">
	canvas {
		height: 50rem;
		width: 100rem;
		max-width: 100%;
		border: 0.2rem solid var(--clr-bg3);
		margin-top: 1rem;
	}
</style>
