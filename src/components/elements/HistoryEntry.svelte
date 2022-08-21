<script lang="ts">
	import Timer from '@lib/timer';
	import formatTime from '@lib/util/formatTime';
	import Session, { sessionHistory } from '@lib/session';
	import activeSession from '@stores/activeSession';
	import type Run from '../../lib/run';

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

<div class="entry">
	<div class="content">
		<div class="session">
			<p>
				Time: {formatTime(Timer.fromJSON(timer).getRunDuration())}
			</p>

			<p>Runners:</p>
			<div class="runners">
				{#each run.runners as runner}
					<div class="runner">
						<p>Name: {runner.name}</p>
						<p>Alias: {runner.alias}</p>
						<p>
							Rounds: {runner.rounds.rounds.length}
						</p>
					</div>
				{:else}
					<p class="runner">None</p>
				{/each}
			</div>

			<p>
				Round Length: {run.roundLength}
			</p>
		</div>

		<div class="dates">
			<p>
				Last modified: {new Date(lastChanged).toLocaleString()}
			</p>
			<p>
				Created: {new Date(created).toLocaleString()}
			</p>
		</div>
	</div>

	<button on:click={() => loadSession(id, session)} class="button small">
		Load
	</button>
	<button
		on:click={() => loadSession(id, session, true)}
		class="button small"
	>
		Copy & Load
	</button>
	<button on:click={() => deleteSession(id)} class="button small warning">
		Delete
	</button>
</div>

<style lang="scss">
	.entry {
		user-select: none;

		background-color: var(--clr-bg2);
		border-radius: 0.5rem;
		padding: 1.5rem;
		margin: 1rem;

		.content {
			display: flex;
			justify-content: space-between;

			margin-bottom: 2rem;

			.session {
				.runners {
					display: flex;
					flex-flow: row wrap;

					.runner {
						padding: 1rem;
						margin: 0.5rem;
						border-radius: 0.5rem;
						box-shadow: inset 0 0 1em #00000050;
					}
				}
			}

			.dates {
				display: flex;
				flex-flow: column nowrap;
				align-items: flex-end;

				p {
					font-size: 1.2rem;
				}
			}
		}
	}
</style>
