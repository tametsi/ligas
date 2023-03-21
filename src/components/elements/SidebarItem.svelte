<script lang="ts">
	import { link } from 'svelte-spa-router';
	import active from 'svelte-spa-router/active';

	export let title: string;
	export let href: string;
</script>

<li {title}>
	<a
		{href}
		use:link
		use:active
		class="btn btn-ghost lg:btn-square lg:px-4 lg:py-3 gap-2 justify-start group"
	>
		<slot />
		<span class="lg:hidden">{title}</span>
	</a>
</li>
