<script>
	import {
		HomeIcon,
		Edit2Icon,
		DatabaseIcon,
		CoffeeIcon,
		ActivityIcon,
		BookIcon,
		BookOpenIcon,
		SettingsIcon,
	} from 'svelte-feather-icons';
	import { link } from 'svelte-spa-router';
	import active from 'svelte-spa-router/active';
</script>

<ul>
	<div>
		<li>
			<a href="/" use:link use:active>
				<HomeIcon class="icon-in-text" /> Main
			</a>
		</li>
		<li>
			<a href="/edit" use:link use:active>
				<Edit2Icon class="icon-in-text" /> Edit
			</a>
		</li>
		<li>
			<a href="/export" use:link use:active>
				<DatabaseIcon class="icon-in-text" /> Export
			</a>
		</li>
		<li>
			<a href="/analytics" use:link use:active>
				<ActivityIcon class="icon-in-text" /> Analytics
			</a>
		</li>
		<li>
			<a href="/history" use:link use:active>
				<BookOpenIcon class="icon-in-text active-icon" />
				<BookIcon class="icon-in-text inactive-icon" />
				History
			</a>
		</li>
	</div>
	<div>
		<li>
			<a href="/settings" use:link use:active>
				<SettingsIcon class="icon-in-text" /> Settings
			</a>
		</li>
		<li>
			<a href="/about" use:link use:active>
				<CoffeeIcon class="icon-in-text" /> About
			</a>
		</li>
	</div>
</ul>
