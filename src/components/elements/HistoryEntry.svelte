<script lang="ts">
	import Timer from '@lib/timer';
	import formatTime from '@lib/util/formatTime';
	import Session, { sessionHistory } from '@lib/session';
	import activeSession from '@stores/activeSession';
	import Run from '@lib/run';
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

<div class="card card-compact bg-base-100 my-2">
	<div class="card-body">
		<p>
			{$_('history.entry.last_modified')}:
			<b>{new Date(lastChanged).toLocaleString()}</b>
			<br />
			{$_('history.entry.created')}:
			<b>{new Date(created).toLocaleString()}</b>
		</p>

		<div>
			<h3 class="font-bold">{$_('history.entry.runners')}:</h3>
			<div class="flex justify-start gap-1 flex-wrap">
				{#each Run.fromJSON(run).runners as runner}
					<div class="card card-compact bg-base-200 p-3">
						<p>{$_('runner.stats.name')}: <b>{runner.name}</b></p>
						{#if runner.alias}
							<p>
								{$_('runner.stats.alias')}:
								<b>{runner.alias}</b>
							</p>
						{/if}
						<p>
							{$_('runner.stats.rounds')}:
							<b>{runner.rounds.count}</b>
						</p>
					</div>
				{:else}
					<p class="runner">{$_('history.entry.none')}</p>
				{/each}
			</div>
		</div>

		<p>
			{$_('history.entry.time')}:
			<b>{formatTime(Timer.fromJSON(timer).getRunDuration())}</b>
			<br />
			{$_('edit.round_length')}:
			<b>{run.roundLength}</b>
		</p>

		<div class="card-actions">
			<button
				on:click={() => loadSession(id, session)}
				class="btn btn-sm"
				title={$_('history.entry.load_title')}
			>
				{$_('history.entry.load')}
			</button>
			<button
				on:click={() => loadSession(id, session, true)}
				class="btn btn-sm"
				title={$_('history.entry.copy_title')}
			>
				{$_('history.entry.copy')} & {$_('history.entry.load')}
			</button>
			<button
				on:click={() => deleteSession(id)}
				class="btn btn-sm btn-error"
				title={$_('history.entry.delete_title')}
			>
				{$_('history.entry.delete')}
			</button>
		</div>
	</div>
</div>
