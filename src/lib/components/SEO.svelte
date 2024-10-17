<script lang="ts">
import { page } from "$app/stores";

export let title = "Chromagen | Home";
export let description = "Chromagen is a tool for generating chroma.js color palettes.";
export let image = "https://chromagen.vercel.app/chromagen.png";
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og_site_name" content="Chromagen" />
	<meta
		property="og:url"
		content="https://chromagen.vercel.app/{$page.url.pathname.toString()}"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="chromagen.vercel.app" />
	<meta
		property="twitter:url"
		content="https://chromagen.vercel.app/{$page.url.pathname.toString()}"
	/>
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	{@html ` <script type="application/ld+json">{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "${title} | Chromagen",
        "url": "https://chromagen.vercel.app/${$page.url.pathname.toString()}",
        "logo": ${image} }</script>`}
</svelte:head>
