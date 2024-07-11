<script>
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';
</script>

<div class="relative flex min-h-dvh flex-col">
	<Navbar />
	<div class="flex-1 p-4">
		<slot />
	</div>
	<Footer />
</div>
