<script lang="ts">
	import { Horse } from "$lib/models/Horse";
	import { Card, Badge, Button } from "$lib/components";

	interface Props {
		horse: Horse;
	}

	let { horse }: Props = $props();
	let expanded = $state(false);
</script>

<Card hover={true} class="group overflow-hidden">
	{#snippet children()}
		<!-- Image Container -->
		<div
			class="relative -mx-6 -mt-6 mb-4 aspect-[4/3] overflow-hidden bg-ivory-dark"
		>
			<!-- Placeholder for actual image -->
			<div
				class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sage/20 to-forest/10"
			>
				<svg
					class="h-24 w-24 text-sage/30"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1"
						d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
					/>
				</svg>
			</div>
			<!-- Actual image (when available) -->
			{#if horse.image}
				<img
					src={horse.image}
					alt={horse.name}
					class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
				/>
			{/if}

			<!-- Status Badge -->
			<div class="absolute top-3 right-3">
				<Badge status={horse.status} size="sm" />
			</div>
		</div>

		<!-- Content -->
		<div class="space-y-2">
			<div class="flex items-start justify-between gap-4">
				<h3
					class="font-display text-xl font-semibold text-forest transition-colors group-hover:text-sage"
				>
					{horse.name}
				</h3>

				{#if horse.status === "Available"}
					<Button
						href="/contact?subject=Adoption"
						variant="secondary"
						size="sm"
						class="border-sage text-sage hover:bg-sage hover:text-white"
					>
						{#snippet children()}
							Inquire
						{/snippet}
					</Button>
				{:else if horse.status === "Sanctuary"}
					<Button href="/donate" variant="primary" size="sm">
						{#snippet children()}
							Donate To
						{/snippet}
					</Button>
				{/if}
			</div>

			<div class="flex items-center gap-3 text-sm text-stone">
				<span>{horse.breed}</span>
				<span class="h-1 w-1 rounded-full bg-stone/50"></span>
				<span>{horse.ageDisplay}</span>
			</div>

			<p
				class="{expanded
					? ''
					: 'line-clamp-3'} text-sm leading-relaxed text-forest/70"
			>
				{horse.bio}
			</p>

			<button
				class="mt-1 text-xs font-medium text-sage hover:underline"
				onclick={() => (expanded = !expanded)}
			>
				{expanded ? "See Less" : "See More"}
			</button>

			{#if horse.sponsorshipTier}
				<p class="text-sm font-medium text-sage">
					✨ {horse.sponsorshipTier}
				</p>
			{/if}
		</div>
	{/snippet}
</Card>
