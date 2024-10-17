<script lang="ts">
	import '../app.css';
	import SEO from '$lib/components/SEO.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '@fontsource-variable/manrope';
	import '@fontsource-variable/inter';
</script>

<SEO
	title="Chromagen | Home"
	description="Chromagen is a tool for generating chroma.js color palettes."
	image="https://chromagen.vercel.app/chromagen.png"
/>
<Header />
<main>
	<slot />
</main>
<Footer />
