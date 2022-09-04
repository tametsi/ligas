<script lang="ts">
	import { Page } from '@stores/activePage';
	import BasePage from '@components/pages/BasePage.svelte';
	import { onMount } from 'svelte';
	import activeRun from '@stores/activeRun';

	let c: any = document.getElementById('canvas');
	let ctx: any;
	let testData = [100, 250, 200, 50, 150];
	let selectedRunner;
	let runnerArray = $activeRun.runners;

	let xIntervallLenght;

	function drawCurve() {
		for (let index = 0; index < testData.length; index++) {
			ctx.moveTo(index * xIntervallLenght, testData[index]);
			ctx.lineTo((index + 1) * xIntervallLenght, testData[index + 1]);
		}
	}

	function canvasSetup() {
		if (runnerArray.length == 0) {
			xIntervallLenght = 0;
		} else {
			xIntervallLenght = c.width / runnerArray.length;
		}
		ctx = c.getContext('2d');
		ctx.strokeStyle = '#1ca8b6';
		drawCurve();

		ctx.stroke();
		ctx.fill();
		logRunners();
	}

	onMount(() => {
		canvasSetup();
		// ctx.moveTo(0, 0);
		// ctx.lineTo(600, 100);
		// clearCanvas();
	});
	function logRunners() {
		runnerArray = $activeRun.runners;
		console.log(runnerArray);
		for (let index = 0; index < runnerArray.length; index++) {
			if (runnerArray[index].id == runnerId) {
				selectedRunner = runnerArray[index];
				console.log(selectedRunner);
			}
		}
	}

	function getRoundTime() {
		return 'test';
	}

	function clearCanvas() {
		ctx.beginPath();
		ctx.fillStyle = '#3b3e45';
		ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.fill();
	}
	let runnerId;
</script>

<BasePage page={Page.analytics}>
	<h2>Analytics</h2>

	<label for="runners">Select Runner</label>
	<select id="runers" bind:value={runnerId} on:change={() => logRunners()}>
		{#each $activeRun.runners as runner}
			<option value={runner.id}>{runner.name}</option>
		{/each}
	</select>

	//TODO - Add that the stats of the selected runner are displayed
	<h3>Stats</h3>
	{#if selectedRunner != null}
		<h4>Name: {selectedRunner.name}</h4>
		<h4>Rounds: {selectedRunner.rounds.all}</h4>
		<h4>Distance: {selectedRunner.distance}m</h4>
	{:else}
		<h4>Name: <i>no name available</i></h4>
		<h4>Rounds: <i>no rounds available</i></h4>
		<h4>Distance: <i>no distance available</i></h4>
	{/if}

	<canvas
		bind:this={c}
		id="canvas"
		width="600"
		height="300"
		style="border:1px solid #000000;"
	/>
	<button on:click={() => canvasSetup()}>clear</button>
</BasePage>

<style lang="scss">
</style>
