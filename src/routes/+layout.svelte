<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.png";
	import { Navbar, Footer } from "$lib/components";

	let { children } = $props();

	// JSON-LD Structured Data for SEO
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "AnimalShelter",
		"@id": "https://thehorseprojectsantabarbara.com",
		name: "The Horse Project Santa Barbara",
		alternateName: "The Horse Project",
		description:
			"A 501(c)(3) nonprofit dedicated to rescuing abandoned and abused horses and providing therapeutic programs for veterans and the community.",
		url: "https://thehorseprojectsantabarbara.com",
		logo: "https://thehorseprojectsantabarbara.com/logo.png",
		address: {
			"@type": "PostalAddress",
			addressLocality: "Santa Barbara",
			addressRegion: "CA",
			addressCountry: "US",
		},
		areaServed: {
			"@type": "Place",
			name: "Santa Barbara County, California",
		},
		nonprofitStatus: "501(c)(3)",
		parentOrganization: {
			"@type": "Organization",
			name: "Players Philanthropy Fund",
			description: "Fiscal sponsor for The Horse Project Santa Barbara",
		},
		sameAs: [
			"https://www.facebook.com/TheHorseProject/",
			"https://www.instagram.com/thehorseprojectsb/?hl=en",
		],
	};

	const jsonLdString = JSON.stringify(jsonLd);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta
		name="description"
		content="The Horse Project Santa Barbara - People helping horses and horses helping people. A 501(c)(3) nonprofit dedicated to rescuing horses and providing therapeutic programs."
	/>
	<meta
		name="keywords"
		content="horse rescue, Santa Barbara, nonprofit, equine therapy, veterans, therapeutic horseback, horse sanctuary"
	/>
	<meta property="og:title" content="The Horse Project Santa Barbara" />
	<meta
		property="og:description"
		content="People helping horses and horses helping people. A 501(c)(3) nonprofit rescuing horses and providing therapeutic programs."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://thehorseprojectsantabarbara.com" />
	<title>The Horse Project Santa Barbara</title>

	<!-- JSON-LD Structured Data -->
	{@html "<script type=\"application/ld+json\">" + jsonLdString + "</script>"}
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Navbar />

	<main class="flex-1">
		{@render children()}
	</main>

	<Footer />
</div>
