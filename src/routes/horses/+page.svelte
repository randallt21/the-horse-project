<script lang="ts">
	import { Button, HorseCard } from "$lib/components";
	import { Horse } from "$lib/models/Horse";
	import horsesData from "$lib/data/horses.json";
	import type { IHorseData, HorseStatus } from "$lib/types";

	// Create Horse instances
	const allHorses = Horse.fromArray(horsesData as IHorseData[]);

	// Filter state
	let activeFilter = $state<HorseStatus | "All">("All");

	// Filtered horses
	let filteredHorses = $derived(
		activeFilter === "All"
			? allHorses
			: allHorses.filter((h) => h.status === activeFilter),
	);

	const filters: (HorseStatus | "All")[] = [
		"All",
		"Available",
		"Sanctuary",
		"Adopted",
	];
</script>

<svelte:head>
	<title>Our Horses | The Horse Project Santa Barbara</title>
	<meta
		name="description"
		content="Meet the rescued horses at The Horse Project Santa Barbara. Some are available for adoption, others are permanent sanctuary residents."
	/>
</svelte:head>

<!-- Hero -->
<section class="bg-forest pt-32 pb-20">
	<div class="container mx-auto px-6 text-center">
		<h1 class="mb-6 font-display text-4xl font-bold text-ivory md:text-5xl">
			Meet <span class="text-sage">Our Horses</span>
		</h1>
		<p class="mx-auto max-w-2xl text-lg text-ivory/70">
			Each horse has a unique story of resilience and hope. Some are
			looking for forever homes, while others have found their sanctuary
			with us.
		</p>
	</div>
</section>

<!-- Filter Tabs -->
<section class="border-b border-ivory-dark bg-ivory py-8">
	<div class="container mx-auto px-6">
		<div class="flex flex-wrap justify-center gap-4">
			{#each filters as filter}
				<button
					class="rounded-full px-6 py-2 font-medium transition-all {activeFilter ===
					filter
						? 'bg-sage text-white'
						: 'bg-white text-forest/70 hover:bg-ivory-dark'}"
					onclick={() => (activeFilter = filter)}
				>
					{filter}
					{#if filter !== "All"}
						<span class="ml-1 text-sm opacity-60">
							({allHorses.filter((h) => h.status === filter)
								.length})
						</span>
					{/if}
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- Horses Grid -->
<section class="bg-ivory py-16">
	<div class="container mx-auto px-6">
		{#if filteredHorses.length === 0}
			<div class="py-12 text-center">
				<p class="text-lg text-forest/60">
					No horses found with this filter.
				</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each filteredHorses as horse (horse.id)}
					<HorseCard {horse} />
				{/each}
			</div>
		{/if}
	</div>
</section>

<!-- Adoption Info -->
<section class="bg-forest py-24">
	<div class="container mx-auto px-6">
		<div class="mx-auto max-w-4xl">
			<div class="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
				<div>
					<h2 class="mb-6 font-display text-3xl font-bold text-ivory">
						Interested in Adoption?
					</h2>
					<p class="mb-6 leading-relaxed text-ivory/80">
						Adopting a rescued horse is a rewarding experience. Our
						adoption process ensures that each horse finds the
						perfect match—a home where they'll be loved and cared
						for.
					</p>
					<ul class="mb-8 space-y-3 text-ivory/70">
						<li class="flex items-start gap-3">
							<span class="text-sage">✓</span>
							<span>Application and interview process</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-sage">✓</span>
							<span>Property and facility review</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-sage">✓</span>
							<span>Trial period to ensure compatibility</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-sage">✓</span>
							<span>Ongoing support and guidance</span>
						</li>
					</ul>
					<Button
						variant="secondary"
						href="mailto:thehorseprojectsb@gmail.com"
						class="border-sage hover:bg-sage hover:text-white"
					>
						{#snippet children()}
							Inquire About Adoption
						{/snippet}
					</Button>
				</div>
				<div
					class="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-gold/20 to-obsidian/10"
				>
					<svg
						class="h-32 w-32 text-sage/30"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1"
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
						/>
					</svg>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Sponsor a Horse -->
<section class="bg-ivory py-24">
	<div class="container mx-auto px-6 text-center">
		<h2 class="mb-6 font-display text-3xl font-bold text-forest">
			Sponsor a Sanctuary Horse
		</h2>
		<p class="mx-auto mb-10 max-w-2xl leading-relaxed text-forest/80">
			Our sanctuary horses are forever residents who need ongoing care. By
			becoming a sponsor, you'll directly support a horse's food, medical
			care, and enrichment needs.
		</p>
		<Button variant="primary" size="lg" href="/donate">
			{#snippet children()}
				Become a Sponsor
			{/snippet}
		</Button>
	</div>
</section>
