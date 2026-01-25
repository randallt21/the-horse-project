<script lang="ts">
	import { Button, Card, HorseCard } from "$lib/components";
	import { Horse } from "$lib/models/Horse";
	import horsesData from "$lib/data/horses.json";
	import type { IHorseData } from "$lib/types";

	// Create Horse instances
	const horses = Horse.fromArray(horsesData as IHorseData[]);
	const featuredHorses = horses
		.filter((h) => h.status === "Available")
		.slice(0, 3);

	// Impact stats
	const stats = [
		{ value: "15+", label: "Years of Rescue" },
		{ value: "50+", label: "Horses Saved" },
		{ value: "500+", label: "Lives Touched" },
		{ value: "100%", label: "Heart" },
	];
</script>

<!-- Hero Section -->
<section
	class="relative flex min-h-[66vh] items-center justify-center overflow-hidden bg-obsidian py-20 md:py-0"
>
	<!-- Background Video -->
	<video
		autoplay
		muted
		loop
		playsinline
		class="absolute inset-0 h-full w-full object-cover"
	>
		<source src="/videos/hero.mp4" type="video/mp4" />
	</video>

	<!-- Dark overlay for text readability -->
	<div class="absolute inset-0 bg-obsidian/50"></div>

	<!-- Content -->
	<div class="relative z-10 container mx-auto px-6 text-center">
		<div class="stagger-children mx-auto max-w-4xl">
			<h1
				class="mb-6 font-display text-4xl leading-tight font-bold text-cream md:text-6xl lg:text-7xl"
			>
				People Helping Horses
				<span class="block text-gold">Horses Helping People</span>
			</h1>

			<p
				class="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-cream/80 md:text-xl"
			>
				We rescue abandoned and abused horses, giving them a second
				chance at life. In turn, these gentle souls help heal the hearts
				of veterans, trauma survivors, and our community.
			</p>

			<div class="flex flex-col justify-center gap-4 sm:flex-row">
				<Button variant="primary" size="lg" href="/donate">
					{#snippet children()}
						Donate Now
					{/snippet}
				</Button>
				<Button variant="secondary" size="lg" href="/join">
					{#snippet children()}
						Volunteer With Us
					{/snippet}
				</Button>
			</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
		<svg
			class="h-6 w-6 text-cream/50"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M19 14l-7 7m0 0l-7-7m7 7V3"
			/>
		</svg>
	</div>
</section>

<!-- Impact Stats -->
<!-- <section class="bg-ivory py-20">
	<div class="container mx-auto px-6">
		<div class="grid grid-cols-2 gap-8 md:grid-cols-4">
			{#each stats as stat}
				<div class="text-center">
					<p
						class="mb-2 font-display text-4xl font-bold text-sage md:text-5xl"
					>
						{stat.value}
					</p>
					<p class="font-medium text-forest/70">{stat.label}</p>
				</div>
			{/each}
		</div>
	</div>
</section> -->

<!-- Mission Section -->
<section class="bg-butter py-24">
	<div class="container mx-auto px-6">
		<div class="mx-auto max-w-3xl text-center">
			<h2
				class="mb-8 font-display text-3xl font-bold text-forest md:text-4xl"
			>
				Our Mission
			</h2>
			<p class="mb-8 text-lg leading-relaxed text-forest/80">
				The Horse Project Santa Barbara is dedicated to the rescue,
				rehabilitation, and rehoming of abandoned, abused, and neglected
				horses. We believe in the healing power of the human-horse
				connection and provide therapeutic programs that benefit both
				horses and people.
			</p>
			<p class="text-lg leading-relaxed text-forest/80">
				Operating under the fiscal sponsorship of the
				<span class="font-semibold text-sage"
					>Players Philanthropy Fund</span
				>, we ensure that every dollar donated goes directly to the care
				of our horses and the communities we serve.
			</p>
		</div>
	</div>
</section>

<!-- Featured Horses -->
<section class="bg-ivory py-24">
	<div class="container mx-auto px-6">
		<div class="mb-12 text-center">
			<h2
				class="mb-4 font-display text-3xl font-bold text-forest md:text-4xl"
			>
				Meet Our Horses
			</h2>
			<p class="mx-auto max-w-2xl text-forest/70">
				These gentle souls are looking for their forever homes. Each
				horse has a unique story and so much love to give.
			</p>
		</div>

		<div class="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each featuredHorses as horse}
				<HorseCard {horse} />
			{/each}
		</div>

		<div class="text-center">
			<Button variant="secondary" href="/horses">
				{#snippet children()}
					View All Horses →
				{/snippet}
			</Button>
		</div>
	</div>
</section>

<!-- Programs Preview -->
<section class="bg-sage py-24 text-white">
	<div class="container mx-auto px-6">
		<div class="mb-12 text-center">
			<h2 class="mb-4 font-display text-3xl font-bold md:text-4xl">
				Our Programs
			</h2>
			<p class="mx-auto max-w-2xl text-white/90">
				From therapeutic sessions to fun weekends with rescued horses,
				we offer programs that transform lives.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
			<!-- Better With Horses -->
			<Card variant="default" padding="lg" class="h-full">
				{#snippet children()}
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20"
					>
						<svg
							class="h-6 w-6 text-forest"
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
						class="mb-4 font-display text-2xl font-semibold text-forest"
					>
						Better With Horses
					</h3>
					<p class="mb-6 leading-relaxed text-stone">
						Our flagship therapeutic program offers 10-week courses
						and weekend retreats. Participants engage in "fun work"
						in the arena to build emotional intelligence, leadership
						skills, and deep connections with our horses.
					</p>
					<p class="mb-6 text-sm text-stone/70">
						✓ Women Veterans Program &nbsp;•&nbsp; ✓ Blind Fitness
						Collaboration &nbsp;•&nbsp; ✓ Corporate Retreats
					</p>
					<Button variant="primary" size="sm" href="/programs">
						{#snippet children()}
							Learn More
						{/snippet}
					</Button>
				{/snippet}
			</Card>

			<!-- Play With Rescued Horses -->
			<Card variant="default" padding="lg" class="h-full">
				{#snippet children()}
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20"
					>
						<svg
							class="h-6 w-6 text-forest"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
							/>
						</svg>
					</div>
					<h3
						class="mb-4 font-display text-2xl font-semibold text-forest"
					>
						Play With Rescued Horses
					</h3>
					<p class="mb-6 leading-relaxed text-stone">
						Join us for a magical morning with our rescued horses!
						No experience needed—just bring your curiosity and an
						open heart. Perfect for individuals, families, and
						groups.
					</p>
					<p class="mb-6 text-sm text-stone/70">
						📅 Fri, Sat, Sun • 9:30 AM - 12:00 PM<br />
						💰 $65 per person
					</p>
					<Button variant="primary" size="sm" href="/programs">
						{#snippet children()}
							Book a Session
						{/snippet}
					</Button>
				{/snippet}
			</Card>
		</div>
	</div>
</section>

<!-- Call to Action -->
<section class="bg-butter py-24">
	<div class="container mx-auto px-6 text-center">
		<h2
			class="mb-6 font-display text-3xl font-bold text-forest md:text-4xl"
		>
			Ready to Make a Difference?
		</h2>
		<p class="mx-auto mb-10 max-w-2xl text-lg text-forest/80">
			Whether you donate, volunteer, or simply spread the word, you're
			helping us save more horses and change more lives.
		</p>
		<div class="flex flex-col justify-center gap-4 sm:flex-row">
			<Button variant="secondary" size="lg" href="/donate">
				{#snippet children()}
					Donate Today
				{/snippet}
			</Button>
			<Button variant="secondary" size="lg" href="/join">
				{#snippet children()}
					Become a Volunteer
				{/snippet}
			</Button>
		</div>
	</div>
</section>
