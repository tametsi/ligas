<script>
	import SidebarItem from '@components/elements/SidebarItem.svelte';
	import {
		Home,
		Edit2,
		Database,
		Coffee,
		Activity,
		Book,
		BookOpen,
		Settings,
	} from 'lucide-svelte';
	import { _ } from '@lib/util/translations';
</script>

<ul
	class="menu justify-between flex-nowrap gap-2 p-2 w-fit h-full bg-base-300 text-base-content border-r-0 border-base-300"
>
	<!-- Sidebar content here -->
	<div class="flex flex-col gap-2">
		<SidebarItem title={$_('main.title')} href="/">
			<Home />
		</SidebarItem>
		<SidebarItem title={$_('edit.title')} href="/edit">
			<Edit2 />
		</SidebarItem>
		<SidebarItem title={$_('export.title')} href="/export">
			<Database />
		</SidebarItem>
		<SidebarItem title={$_('analytics.title')} href="/analytics">
			<Activity />
		</SidebarItem>
		<SidebarItem title={$_('history.title')} href="/history">
			<BookOpen class="hidden group-[.active]:block" />
			<Book class="group-[.active]:hidden" />
		</SidebarItem>
	</div>

	<div class="flex flex-col gap-2">
		<SidebarItem title={$_('settings.title')} href="/settings">
			<Settings />
		</SidebarItem>
		<SidebarItem title={$_('about.title')} href="/about">
			<Coffee />
		</SidebarItem>
	</div>
</ul>
