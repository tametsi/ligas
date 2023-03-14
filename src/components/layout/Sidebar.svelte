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

<ul
	class="menu justify-between gap-2 p-2 w-fit bg-base-300 text-base-content border-r-0 border-base-300"
>
	<!-- Sidebar content here -->
	<div class="flex flex-col gap-2">
		<li title="Home">
			<a href="/" use:link use:active class="btn btn-square btn-ghost"
				><HomeIcon /></a
			>
		</li>
		<li title="Edit">
			<a href="/edit" use:link use:active class="btn btn-square btn-ghost"
				><Edit2Icon /></a
			>
		</li>
		<li title="Export">
			<a
				href="/export"
				use:link
				use:active
				class="btn btn-square btn-ghost"
			>
				<DatabaseIcon />
			</a>
		</li>
		<li title="Analytics">
			<a
				href="/analytics"
				use:link
				use:active
				class="btn btn-square btn-ghost"
			>
				<ActivityIcon />
			</a>
		</li>
		<li title="History">
			<a
				href="/history"
				use:link
				use:active
				class="btn btn-square btn-ghost group"
			>
				<BookOpenIcon class="hidden group-[.active]:block" />
				<BookIcon class="group-[.active]:hidden" />
			</a>
		</li>
	</div>

	<div class="flex flex-col gap-2">
		<li>
			<a
				href="/settings"
				use:link
				use:active
				class="btn btn-square btn-ghost no-animation"
			>
				<SettingsIcon />
			</a>
		</li>
		<li>
			<a
				href="/about"
				use:link
				use:active
				class="btn btn-square btn-ghost"
			>
				<CoffeeIcon />
			</a>
		</li>
	</div>
</ul>
