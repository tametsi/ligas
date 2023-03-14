<script lang="ts">
	import Timer from '@lib/timer';
	import formatTime from '@lib/util/formatTime';
	import Session, { sessionHistory } from '@lib/session';
	import activeSession from '@stores/activeSession';
	import type Run from '@lib/run';

	export let id: string,
		timer: ReturnType<Timer['toJSON']>,
		run: ReturnType<Run['toJSON']>,
		session: ReturnType<Session['toJSON']>,
		created: number,
		lastChanged: number;

	function loadSession(
		id: string,
		savedSession: ReturnType<Session['toJSON']>,
		copy = false
	) {
		if (
			confirm(
				`Do you really want to ${
					copy ? 'copy' : 'load'
				} that session? Your current session will be lost!`
			)
		) {
			$activeSession.delete();
			const session = Session.fromJSON(savedSession, id);
			$activeSession = copy ? session.clone() : session;
		}
	}

	function deleteSession(id: string) {
		if (confirm('Do you really want to delete this session?'))
			sessionHistory.removeEntry(id);
	}
</script>

<div class="card card-compact bg-base-100 my-2">
	<div class="card-body">
		<p>
			Last modified: <b>{new Date(lastChanged).toLocaleString()}</b>
			<br />
			Created: <b>{new Date(created).toLocaleString()}</b>
		</p>

		<div class="">
			<h3 class="font-bold">Runners:</h3>
			<div class="flex justify-start gap-1 flex-wrap">
				{#each run.runners as runner}
					<div class="card card-compact bg-base-200 p-3">
						<p>Name: <b>{runner.name}</b></p>
						{#if runner.alias}
							<p>Alias: <b>{runner.alias}</b></p>
						{/if}
						<p>
							Rounds: <b>{runner.rounds.rounds.length}</b>
						</p>
					</div>
				{:else}
					<p>None</p>
				{/each}
			</div>
		</div>

		<p>
			Time:
			<b>{formatTime(Timer.fromJSON(timer).getRunDuration())}</b>
			<br />
			Round Length: <b>{run.roundLength}</b>
		</p>

		<div class="card-actions">
			<button
				on:click={() => loadSession(id, session)}
				class="btn btn-sm"
				title="Loads this session. This session will be modified."
			>
				Load
			</button>
			<button
				on:click={() => loadSession(id, session, true)}
				class="btn btn-sm"
				title="Copies this session and loads the copy. This session will stay untouched."
			>
				Copy & Load
			</button>
			<button
				on:click={() => deleteSession(id)}
				class="btn btn-sm btn-error"
				title="Deletes this session."
			>
				Delete
			</button>
		</div>
	</div>
</div>
