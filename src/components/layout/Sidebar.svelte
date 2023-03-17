<script>
	import SidebarItem from '@components/elements/SidebarItem.svelte';
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
</script>

<ul
	class="menu justify-between gap-2 p-2 w-fit bg-base-300 text-base-content border-r-0 border-base-300"
>
	<!-- Sidebar content here -->
	<div class="flex flex-col gap-2">
		<SidebarItem title="Home" href="/">
			<HomeIcon />
		</SidebarItem>
		<SidebarItem title="Edit" href="/edit">
			<Edit2Icon />
		</SidebarItem>
		<SidebarItem title="Export" href="/export">
			<DatabaseIcon />
		</SidebarItem>
		<SidebarItem title="Analytics" href="/analytics">
			<ActivityIcon />
		</SidebarItem>
		<SidebarItem title="History" href="/history">
			<BookOpenIcon class="hidden group-[.active]:block" />
			<BookIcon class="group-[.active]:hidden" />
		</SidebarItem>
	</div>

	<div class="flex flex-col gap-2">
		<SidebarItem title="Settings" href="/settings">
			<SettingsIcon />
		</SidebarItem>
		<SidebarItem title="About" href="/about">
			<CoffeeIcon />
		</SidebarItem>
	</div>
</ul>
