<script lang="ts">
	import { Button, Card } from "$lib/components";
</script>

<svelte:head>
	<title>About Us | The Horse Project Santa Barbara</title>
	<meta
		name="description"
		content="Learn about The Horse Project Santa Barbara's mission to rescue horses and provide therapeutic programs for our community."
	/>
</svelte:head>

<!-- Hero -->
<section class="bg-forest pt-32 pb-20">
	<div class="container mx-auto px-6 text-center">
		<h1 class="mb-6 font-display text-4xl font-bold text-ivory md:text-5xl">
			About <span class="text-sage">The Horse Project</span>
		</h1>
		<p class="mx-auto max-w-2xl text-lg text-ivory/70">
			A sanctuary where horses find healing, and people discover the
			transformative power of the human-horse connection.
		</p>
	</div>
</section>

<!-- Our Story -->
<section class="bg-ivory py-24">
	<div class="container mx-auto px-6">
		<div class="mx-auto max-w-4xl">
			<h2
				class="mb-8 text-center font-display text-3xl font-bold text-forest"
			>
				Our Story
			</h2>

			<div class="prose prose-lg mx-auto text-forest/80">
				<p class="mb-6 text-lg leading-relaxed">
					The Horse Project Santa Barbara was born from a simple but
					powerful belief:
					<strong class="text-sage"
						>horses and humans heal each other</strong
					>. What started as a small effort to rescue abandoned horses
					has grown into a thriving sanctuary and therapeutic center
					that transforms lives daily.
				</p>

				<p class="mb-6 text-lg leading-relaxed">
					Over the past 15 years, we've rescued more than 50 horses
					from neglect, abuse, and abandonment. Each horse that
					arrives at our sanctuary receives individualized care,
					rehabilitation, and love. Many go on to find forever homes;
					others become permanent residents who serve as gentle
					teachers in our therapeutic programs.
				</p>

				<p class="text-lg leading-relaxed">
					Today, we're proud to offer programs that serve veterans
					healing from trauma, individuals seeking connection, and
					families looking for meaningful experiences. Our horses
					don't just receive care—they give back immeasurably.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Core Values -->
<section class="bg-ivory-light py-24">
	<div class="container mx-auto px-6">
		<h2
			class="mb-12 text-center font-display text-3xl font-bold text-forest"
		>
			Our Core Values
		</h2>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<Card padding="lg">
				{#snippet children()}
					<div class="text-center">
						<div
							class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage/20"
						>
							<svg
								class="h-8 w-8 text-sage"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
						</div>
						<h3
							class="mb-3 font-display text-xl font-semibold text-forest"
						>
							Compassion
						</h3>
						<p class="text-forest/70">
							Every horse deserves love, dignity, and a second
							chance. We treat each animal as an individual with
							unique needs and potential.
						</p>
					</div>
				{/snippet}
			</Card>

			<Card padding="lg">
				{#snippet children()}
					<div class="text-center">
						<div
							class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage/20"
						>
							<svg
								class="h-8 w-8 text-sage"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
						</div>
						<h3
							class="mb-3 font-display text-xl font-semibold text-forest"
						>
							Community
						</h3>
						<p class="text-forest/70">
							We bring people together around a shared love for
							horses. Our programs build connections that last a
							lifetime.
						</p>
					</div>
				{/snippet}
			</Card>

			<Card padding="lg">
				{#snippet children()}
					<div class="text-center">
						<div
							class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage/20"
						>
							<svg
								class="h-8 w-8 text-sage"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
								/>
							</svg>
						</div>
						<h3
							class="mb-3 font-display text-xl font-semibold text-forest"
						>
							Healing
						</h3>
						<p class="text-forest/70">
							We believe in the therapeutic power of horses.
							Through our programs, both horses and humans find
							healing and growth.
						</p>
					</div>
				{/snippet}
			</Card>
		</div>
	</div>
</section>

<!-- Fiscal Sponsorship -->
<section class="bg-ivory py-24">
	<div class="container mx-auto px-6">
		<div class="mx-auto max-w-4xl">
			<Card variant="glass" padding="lg">
				{#snippet children()}
					<div class="text-center">
						<h2
							class="mb-6 font-display text-2xl font-bold text-forest"
						>
							Our Fiscal Sponsorship
						</h2>
						<p class="mb-6 leading-relaxed text-forest/80">
							The Horse Project Santa Barbara operates under the
							fiscal sponsorship of the
							<strong class="text-sage"
								>Players Philanthropy Fund</strong
							>, a 501(c)(3) public charity. This partnership
							ensures that all donations are tax-deductible and
							that we maintain the highest standards of nonprofit
							governance.
						</p>
						<p class="text-sm text-forest/60">
							Tax-deductible donations can be made directly to The
							Horse Project Santa Barbara. All contributions are
							used exclusively for horse care, sanctuary
							operations, and therapeutic programs.
						</p>
					</div>
				{/snippet}
			</Card>
		</div>
	</div>
</section>

<!-- The Sanctuary Concept -->
<section class="bg-forest py-24 text-ivory">
	<div class="container mx-auto px-6">
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="mb-8 font-display text-3xl font-bold">
				The Sanctuary Concept
			</h2>
			<p class="mb-8 text-lg leading-relaxed text-ivory/80">
				Some of our horses are forever residents—horses who, due to age,
				health, or temperament, will live out their days in our care.
				These
				<strong class="text-sage">Sanctuary Horses</strong> are the heart
				of our therapeutic programs.
			</p>
			<p class="mb-12 leading-relaxed text-ivory/70">
				Our sanctuary is not just a place to live—it's a place to
				thrive. Each horse receives specialized care, enrichment, and
				the freedom to simply be a horse. In return, they offer
				something priceless: their gentle presence, which helps heal the
				humans who visit.
			</p>
			<Button variant="primary" href="/donate">
				{#snippet children()}
					Support a Sanctuary Horse
				{/snippet}
			</Button>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="bg-sage py-24">
	<div class="container mx-auto px-6 text-center">
		<h2 class="mb-6 font-display text-3xl font-bold text-forest">
			Join Our Family
		</h2>
		<p class="mx-auto mb-10 max-w-2xl text-forest/80">
			Whether you're looking to volunteer, donate, or simply visit our
			horses, we'd love to welcome you.
		</p>
		<div class="flex flex-col justify-center gap-4 sm:flex-row">
			<Button variant="secondary" href="/join">
				{#snippet children()}
					Become a Volunteer
				{/snippet}
			</Button>
			<Button variant="secondary" href="/horses">
				{#snippet children()}
					Meet Our Horses
				{/snippet}
			</Button>
		</div>
	</div>
</section>
