<script lang="ts">
	import formatTime from '@lib/util/formatTime';
	import activeSession from '@stores/activeSession';
	$: time = $activeSession.timer.remaining;
</script>

<span class="align-middle font-mono">{formatTime($time)}</span>
