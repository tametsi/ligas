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
	import { link } from 'svelte-spa-router';
	import active from 'svelte-spa-router/active';
	import { _ } from '@lib/util/translations';
</script>

<ul
	class="menu justify-between gap-2 p-2 w-fit bg-base-300 text-base-content border-r-0 border-base-300"
>
	<!-- Sidebar content here -->
	<div class="flex flex-col gap-2">
		<SidebarItem title={$_('main.title')} href="/">
			<HomeIcon />
		</SidebarItem>
		<SidebarItem title={$_('edit.title')} href="/edit">
			<Edit2Icon />
		</SidebarItem>
		<SidebarItem title={$_('export.title')} href="/export">
			<DatabaseIcon />
		</SidebarItem>
		<SidebarItem title={$_('analytics.title')} href="/analytics">
			<ActivityIcon />
		</SidebarItem>
		<SidebarItem title={$_('history.title')} href="/history">
			<BookOpenIcon class="hidden group-[.active]:block" />
			<BookIcon class="group-[.active]:hidden" />
		</SidebarItem>
	</div>

	<div class="flex flex-col gap-2">
		<SidebarItem title={$_('settings.title')} href="/settings">
			<SettingsIcon />
		</SidebarItem>
		<SidebarItem title={$_('about.title')} href="/about">
			<CoffeeIcon />
		</SidebarItem>
	</div>
</ul>
