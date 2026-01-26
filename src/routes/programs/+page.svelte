<script lang="ts">
	import { Button, Card } from "$lib/components";
</script>

<svelte:head>
	<title>Programs | The Horse Project Santa Barbara</title>
	<meta
		name="description"
		content="Explore our therapeutic programs including Better With Horses and Play With Rescued Horses sessions."
	/>
</svelte:head>

<!-- Hero -->
<section class="bg-forest pt-32 pb-20">
	<div class="container mx-auto px-6 text-center">
		<h1 class="mb-6 font-display text-4xl font-bold text-ivory md:text-5xl">
			Our <span class="text-sage">Programs</span>
		</h1>
		<p class="mx-auto max-w-2xl text-lg text-ivory/70">
			From therapeutic sessions to fun weekends with rescued horses, we
			offer transformative experiences for all.
		</p>
	</div>
</section>

<!-- Better With Horses -->
<section class="bg-ivory py-24">
	<div class="container mx-auto px-6">
		<div class="mx-auto max-w-6xl">
			<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
				<div>
					<span
						class="text-sm font-semibold tracking-wide text-sage uppercase"
					>
						Therapeutic Program
					</span>
					<h2
						class="mt-2 mb-6 font-display text-3xl font-bold text-forest md:text-4xl"
					>
						Better With Horses
					</h2>
					<p class="mb-6 leading-relaxed text-forest/80">
						Our flagship therapeutic program offers immersive
						experiences that combine ground-based horse activities
						with mindfulness and emotional growth. No riding
						experience required—the magic happens on the ground.
					</p>
					<p class="mb-8 leading-relaxed text-forest/80">
						Through "fun work" in the arena, participants develop
						emotional intelligence, leadership skills, and deep
						connections with our rescued horses. Each horse becomes
						a mirror, reflecting back what we need to see about
						ourselves.
					</p>

					<div class="mb-8 space-y-4">
						<h3 class="font-semibold text-forest">
							Program Options:
						</h3>
						<ul class="space-y-3 text-forest/70">
							<li class="flex items-start gap-3">
								<span class="font-bold text-sage">•</span>
								<div>
									<span class="font-medium text-forest"
										>10-Week Courses</span
									>
									<span class="block text-sm"
										>Deep dive into horse-assisted learning</span
									>
								</div>
							</li>
							<li class="flex items-start gap-3">
								<span class="font-bold text-sage">•</span>
								<div>
									<span class="font-medium text-forest"
										>Weekend Retreats</span
									>
									<span class="block text-sm"
										>Intensive immersion experiences</span
									>
								</div>
							</li>
							<li class="flex items-start gap-3">
								<span class="font-bold text-sage">•</span>
								<div>
									<span class="font-medium text-forest"
										>Corporate Workshops</span
									>
									<span class="block text-sm"
										>Team building and leadership
										development</span
									>
								</div>
							</li>
						</ul>
					</div>

					<Button variant="primary" href="/contact?subject=Programs">
						{#snippet children()}
							Inquire About Programs
						{/snippet}
					</Button>
				</div>

				<div class="space-y-6">
					<iframe
						src="https://www.youtube.com/embed/U10NdeKeHD0"
						title="Better With Horses Program"
						class="aspect-video w-full rounded-2xl shadow-sm"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>

					<Card padding="md">
						{#snippet children()}
							<h4 class="mb-3 font-semibold text-forest">
								Women Veterans Program
							</h4>
							<p class="text-sm leading-relaxed text-forest/70">
								A specialized program created in partnership
								with local veteran services. Women veterans find
								healing and camaraderie through their connection
								with our rescued horses.
							</p>
						{/snippet}
					</Card>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Play With Rescued Horses -->
<section class="bg-forest py-24 text-ivory">
	<div class="container mx-auto px-6">
		<div class="mx-auto max-w-6xl">
			<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
				<div class="order-2 lg:order-1">
					<img
						src="/women-and-horses.avif"
						alt="Play With Rescued Horses"
						class="aspect-square w-full rounded-2xl object-cover shadow-md"
					/>
				</div>

				<div class="order-1 lg:order-2">
					<span
						class="text-sm font-semibold tracking-wide text-sage uppercase"
					>
						Weekend Experience
					</span>
					<h2
						class="mt-2 mb-6 font-display text-3xl font-bold md:text-4xl"
					>
						Play With Rescued Horses
					</h2>
					<p class="mb-6 leading-relaxed text-ivory/80">
						Join us for a magical morning with our rescued horses!
						This is not a riding experience—it's something deeper.
						Brush them, lead them, and simply be present with these
						gentle souls.
					</p>
					<p class="mb-8 leading-relaxed text-ivory/70">
						No experience needed—just bring your curiosity and an
						open heart. Perfect for individuals, families, and small
						groups looking for a meaningful connection with animals.
					</p>

					<div class="mb-8 rounded-xl bg-ivory p-6 shadow-sm">
						<div class="grid grid-cols-2 gap-6">
							<div>
								<p class="mb-1 font-semibold text-forest">
									Schedule
								</p>
								<p class="text-forest/70">
									Friday, Saturday, Sunday
								</p>
								<p class="text-forest/70">9:30 AM - 12:00 PM</p>
							</div>
							<div>
								<p class="mb-1 font-semibold text-forest">
									Investment
								</p>
								<p class="text-2xl font-bold text-forest/80">
									$65
								</p>
								<p class="text-sm text-forest/60">per person</p>
							</div>
						</div>
					</div>

					<Button variant="primary" href="/book">
						{#snippet children()}
							Book Your Session
						{/snippet}
					</Button>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- What to Expect -->
<section class="bg-ivory py-24">
	<div class="container mx-auto px-6">
		<div class="mb-12 text-center">
			<h2 class="mb-4 font-display text-3xl font-bold text-forest">
				What to Expect
			</h2>
			<p class="mx-auto max-w-2xl text-forest/70">
				Whether you're joining a program or a play session, here's what
				your experience will look like.
			</p>
		</div>

		<div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-4">
			<Card padding="md">
				{#snippet children()}
					<div class="text-center">
						<div
							class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20"
						>
							<span class="text-lg font-bold text-sage">1</span>
						</div>
						<h3 class="mb-2 font-semibold text-forest">
							Arrive & Connect
						</h3>
						<p class="text-sm text-forest/70">
							Meet our team and get oriented to the sanctuary
							environment.
						</p>
					</div>
				{/snippet}
			</Card>

			<Card padding="md">
				{#snippet children()}
					<div class="text-center">
						<div
							class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20"
						>
							<span class="text-lg font-bold text-sage">2</span>
						</div>
						<h3 class="mb-2 font-semibold text-forest">
							Meet the Horses
						</h3>
						<p class="text-sm text-forest/70">
							Learn about each horse's story and observe their
							unique personalities.
						</p>
					</div>
				{/snippet}
			</Card>

			<Card padding="md">
				{#snippet children()}
					<div class="text-center">
						<div
							class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20"
						>
							<span class="text-lg font-bold text-sage">3</span>
						</div>
						<h3 class="mb-2 font-semibold text-forest">
							Interact & Learn
						</h3>
						<p class="text-sm text-forest/70">
							Groom, lead, and engage in ground-based activities
							with the horses.
						</p>
					</div>
				{/snippet}
			</Card>

			<Card padding="md">
				{#snippet children()}
					<div class="text-center">
						<div
							class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20"
						>
							<span class="text-lg font-bold text-sage">4</span>
						</div>
						<h3 class="mb-2 font-semibold text-forest">
							Reflect & Grow
						</h3>
						<p class="text-sm text-forest/70">
							Take time to process your experience and the
							insights you've gained.
						</p>
					</div>
				{/snippet}
			</Card>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="bg-sage py-24">
	<div class="container mx-auto px-6 text-center">
		<h2 class="mb-6 font-display text-3xl font-bold text-forest">
			Ready to Experience the Magic?
		</h2>
		<p class="mx-auto mb-10 max-w-2xl text-forest/80">
			Whether you're seeking healing, connection, or simply a unique
			experience with horses, we're here to welcome you.
		</p>
		<div class="flex flex-col justify-center gap-4 sm:flex-row">
			<Button variant="secondary" href="/contact?subject=Programs">
				{#snippet children()}
					Contact Us
				{/snippet}
			</Button>
			<Button variant="secondary" href="/donate">
				{#snippet children()}
					Support Our Programs
				{/snippet}
			</Button>
		</div>
	</div>
</section>
