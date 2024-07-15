<script>
	import Github from '$lib/icons/Github.svelte';
</script>

<footer class="footer items-center bg-neutral p-4 text-neutral-content">
	<aside class="grid-flow-col items-center">
		<p>
			Copyright {new Date().getFullYear()}.
			<a href="https://github.com/wontory" class="hover:text-white">wontory</a> All right reserved
		</p>
	</aside>
	<nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
		<a href="https://github.com/wontory/auto-table">
			<Github class="h-6 w-6 transition-colors duration-200 hover:text-white" />
		</a>
	</nav>
</footer>
