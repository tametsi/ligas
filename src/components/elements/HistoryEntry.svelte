<script lang="ts">
	import Timer from '@lib/timer';
	import formatTime from '@lib/util/formatTime';
	import Session, { sessionHistory } from '@lib/session';
	import activeSession from '@stores/activeSession';
	import type Run from '@lib/run';
	import { _ } from '@lib/util/translations';

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
				`${$_('history.entry.load_prompt.0')} ${
					copy ? $_('history.entry.copy') : $_('history.entry.load')
				}${$_('history.entry.load_prompt.1')}`
			)
		) {
			$activeSession.delete();
			const session = Session.fromJSON(savedSession, id);
			$activeSession = copy ? session.clone() : session;
		}
	}

	function deleteSession(id: string) {
		if (confirm($_('history.entry.delete_prompt')))
			sessionHistory.removeEntry(id);
	}
</script>

<div class="entry">
	<div class="content">
		<div class="session">
			<p>
				{$_('history.entry.time')}
				<b>{formatTime(Timer.fromJSON(timer).getRunDuration())}</b>
			</p>

			<p>{$_('history.entry.runners')}:</p>
			<div class="runners">
				{#each run.runners as runner}
					<div class="runner">
						<p>{$_('runner.stats.name')}: <b>{runner.name}</b></p>
						{#if runner.alias}
							<p>
								{$_('runner.stats.alias')}:
								<b>{runner.alias}</b>
							</p>
						{/if}
						<p>
							{$_('runner.stats.rounds')}:
							<b>{runner.rounds.rounds.length}</b>
						</p>
					</div>
				{:else}
					<p class="runner">{$_('history.entry.none')}</p>
				{/each}
			</div>

			<p>
				{$_('edit.round_length')}: <b>{run.roundLength}</b>
			</p>
		</div>

		<div class="dates">
			<p>
				{$_('history.entry.last_modified')}:
				<b>{new Date(lastChanged).toLocaleString()}</b>
			</p>
			<p>
				{$_('history.entry.created')}:
				<b>{new Date(created).toLocaleString()}</b>
			</p>
		</div>
	</div>

	<button
		on:click={() => loadSession(id, session)}
		class="button small"
		title="Loads this session. This session will be modified."
	>
		{$_('history.entry.load')}
	</button>
	<button
		on:click={() => loadSession(id, session, true)}
		class="button small"
		title="Copies this session and loads the copy. This session will stay untouched."
	>
		{$_('history.entry.copy')} & {$_('history.entry.load')}
	</button>
	<button
		on:click={() => deleteSession(id)}
		class="button small warning"
		title="Deletes this session."
	>
		{$_('history.entry.delete')}
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
