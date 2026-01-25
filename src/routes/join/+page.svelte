<script lang="ts">
	import { Button, Card } from '$lib/components';
	import { volunteerSchema, type VolunteerFormData } from '$lib/schemas';

	// Form state
	let formData = $state<Partial<VolunteerFormData>>({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		bio: '',
		availability: [],
		orientationDate: '',
		referralSource: ''
	});

	let errors = $state<Record<string, string>>({});
	let submitted = $state(false);
	let isSubmitting = $state(false);

	const shifts = [
		{ id: 'mon_am', label: 'Monday AM', time: '8:00 - 12:00' },
		{ id: 'mon_pm', label: 'Monday PM', time: '1:00 - 5:00' },
		{ id: 'thu_am', label: 'Thursday AM', time: '8:00 - 12:00' },
		{ id: 'fri_am', label: 'Friday AM', time: '8:00 - 12:00' },
		{ id: 'sat_am', label: 'Saturday AM', time: '8:00 - 12:00' },
		{ id: 'sun_am', label: 'Sunday AM', time: '8:00 - 12:00' }
	] as const;

	const referralSources = [
		'Friend or Family',
		'Social Media',
		'Google Search',
		'Local Event',
		'News/Media',
		'Other'
	];

	function toggleShift(shiftId: string) {
		const current = formData.availability || [];
		if (current.includes(shiftId as any)) {
			formData.availability = current.filter((s) => s !== shiftId) as any;
		} else {
			formData.availability = [...current, shiftId] as any;
		}
	}

	function validateForm(): boolean {
		const result = volunteerSchema.safeParse(formData);
		if (!result.success) {
			errors = {};
			result.error.issues.forEach((issue) => {
				const field = issue.path[0] as string;
				errors[field] = issue.message;
			});
			return false;
		}
		errors = {};
		return true;
	}

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		isSubmitting = true;

		// Simulate submission (UI only - no backend yet)
		setTimeout(() => {
			isSubmitting = false;
			submitted = true;
		}, 1500);
	}
</script>

<svelte:head>
	<title>Volunteer | The Horse Project Santa Barbara</title>
	<meta
		name="description"
		content="Join our volunteer team and help care for rescued horses at The Horse Project Santa Barbara."
	/>
</svelte:head>

<!-- Hero -->
<section class="bg-forest pt-32 pb-20">
	<div class="container mx-auto px-6 text-center">
		<h1 class="mb-6 font-display text-4xl font-bold text-ivory md:text-5xl">
			Become a <span class="text-sage">Volunteer</span>
		</h1>
		<p class="mx-auto max-w-2xl text-lg text-ivory/70">
			Join our team of dedicated volunteers who help care for our rescued horses. No experience
			necessary—just a love for horses and a willingness to learn.
		</p>
	</div>
</section>

<!-- Form Section -->
<section class="bg-ivory py-16">
	<div class="container mx-auto px-6">
		<div class="mx-auto max-w-3xl">
			{#if submitted}
				<!-- Success State -->
				<Card padding="lg" class="text-center">
					{#snippet children()}
						<div class="py-8">
							<div
								class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100"
							>
								<svg
									class="h-10 w-10 text-emerald-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<h2 class="mb-4 font-display text-2xl font-bold text-forest">
								Thank You for Your Interest!
							</h2>
							<p class="mx-auto mb-6 max-w-md text-forest/70">
								We've received your volunteer application. Our team will be in touch within 48 hours
								to discuss next steps.
							</p>
							<Button variant="primary" href="/">
								{#snippet children()}
									Return Home
								{/snippet}
							</Button>
						</div>
					{/snippet}
				</Card>
			{:else}
				<!-- Form -->
				<Card padding="lg">
					{#snippet children()}
						<form onsubmit={handleSubmit} class="space-y-8">
							<!-- Personal Info -->
							<div>
								<h2 class="mb-4 font-display text-xl font-semibold text-forest">
									Personal Information
								</h2>
								<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
									<div>
										<label for="firstName" class="mb-2 block text-sm font-medium text-forest">
											First Name *
										</label>
										<input
											type="text"
											id="firstName"
											bind:value={formData.firstName}
											class="w-full rounded-lg border px-4 py-3 {errors.firstName
												? 'border-red-500'
												: 'border-ivory-dark'} focus:border-sage focus:ring-2 focus:ring-sage/20"
										/>
										{#if errors.firstName}
											<p class="mt-1 text-sm text-red-500">{errors.firstName}</p>
										{/if}
									</div>
									<div>
										<label for="lastName" class="mb-2 block text-sm font-medium text-forest">
											Last Name *
										</label>
										<input
											type="text"
											id="lastName"
											bind:value={formData.lastName}
											class="w-full rounded-lg border px-4 py-3 {errors.lastName
												? 'border-red-500'
												: 'border-ivory-dark'} focus:border-sage focus:ring-2 focus:ring-sage/20"
										/>
										{#if errors.lastName}
											<p class="mt-1 text-sm text-red-500">{errors.lastName}</p>
										{/if}
									</div>
								</div>
							</div>

							<!-- Contact Info -->
							<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
								<div>
									<label for="email" class="mb-2 block text-sm font-medium text-forest">
										Email Address *
									</label>
									<input
										type="email"
										id="email"
										bind:value={formData.email}
										class="w-full rounded-lg border px-4 py-3 {errors.email
											? 'border-red-500'
											: 'border-ivory-dark'} focus:border-sage focus:ring-2 focus:ring-sage/20"
									/>
									{#if errors.email}
										<p class="mt-1 text-sm text-red-500">{errors.email}</p>
									{/if}
								</div>
								<div>
									<label for="phone" class="mb-2 block text-sm font-medium text-forest">
										Phone Number *
									</label>
									<input
										type="tel"
										id="phone"
										bind:value={formData.phone}
										class="w-full rounded-lg border px-4 py-3 {errors.phone
											? 'border-red-500'
											: 'border-ivory-dark'} focus:border-sage focus:ring-2 focus:ring-sage/20"
									/>
									{#if errors.phone}
										<p class="mt-1 text-sm text-red-500">{errors.phone}</p>
									{/if}
								</div>
							</div>

							<!-- Bio -->
							<div>
								<label for="bio" class="mb-2 block text-sm font-medium text-forest">
									Tell Us About Yourself
								</label>
								<textarea
									id="bio"
									rows="4"
									bind:value={formData.bio}
									placeholder="Share your experience with horses, why you want to volunteer, etc."
									class="w-full rounded-lg border border-ivory-dark px-4 py-3 focus:border-sage focus:ring-2 focus:ring-sage/20"
								></textarea>
								<p class="mt-1 text-sm text-forest/50">
									{formData.bio?.length || 0}/500 characters
								</p>
							</div>

							<!-- Availability -->
							<div>
								<h2 class="mb-4 font-display text-xl font-semibold text-forest">
									Availability *
								</h2>
								<p class="mb-4 text-sm text-forest/70">Select the shifts you're available for:</p>
								<div class="grid grid-cols-2 gap-3 md:grid-cols-3">
									{#each shifts as shift}
										<button
											type="button"
											onclick={() => toggleShift(shift.id)}
											class="rounded-lg border p-4 text-left transition-all {formData.availability?.includes(
												shift.id as any
											)
												? 'border-sage bg-sage text-forest'
												: 'border-ivory-dark bg-white hover:border-sage'}"
										>
											<p class="font-medium">{shift.label}</p>
											<p class="text-sm opacity-70">{shift.time}</p>
										</button>
									{/each}
								</div>
								{#if errors.availability}
									<p class="mt-2 text-sm text-red-500">{errors.availability}</p>
								{/if}
							</div>

							<!-- Referral Source -->
							<div>
								<label for="referralSource" class="mb-2 block text-sm font-medium text-forest">
									How did you hear about us?
								</label>
								<select
									id="referralSource"
									bind:value={formData.referralSource}
									class="w-full rounded-lg border border-ivory-dark px-4 py-3 focus:border-sage focus:ring-2 focus:ring-sage/20"
								>
									<option value="">Select an option</option>
									{#each referralSources as source}
										<option value={source}>{source}</option>
									{/each}
								</select>
							</div>

							<!-- Submit -->
							<div class="pt-4">
								<Button variant="primary" size="lg" type="submit" disabled={isSubmitting}>
									{#snippet children()}
										{#if isSubmitting}
											<span class="flex items-center gap-2">
												<svg class="h-5 w-5 animate-spin" viewBox="0 0 24 24">
													<circle
														class="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														stroke-width="4"
														fill="none"
													/>
													<path
														class="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
													/>
												</svg>
												Submitting...
											</span>
										{:else}
											Submit Application
										{/if}
									{/snippet}
								</Button>
								<p class="mt-4 text-sm text-forest/50">
									By submitting, you agree to attend a brief orientation session before your first
									volunteer shift.
								</p>
							</div>
						</form>
					{/snippet}
				</Card>
			{/if}
		</div>
	</div>
</section>

<!-- What Volunteers Do -->
<section class="bg-ivory-light py-24">
	<div class="container mx-auto px-6">
		<div class="mb-12 text-center">
			<h2 class="mb-4 font-display text-3xl font-bold text-forest">What Volunteers Do</h2>
			<p class="mx-auto max-w-2xl text-forest/70">
				Our volunteers are essential to daily operations. Here's what a typical day looks like:
			</p>
		</div>

		<div class="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
			<Card padding="md">
				{#snippet children()}
					<h3 class="mb-3 font-semibold text-forest">🐴 Horse Care</h3>
					<p class="text-sm text-forest/70">
						Feeding, grooming, and general care. No experience needed—we'll teach you everything!
					</p>
				{/snippet}
			</Card>

			<Card padding="md">
				{#snippet children()}
					<h3 class="mb-3 font-semibold text-forest">🧹 Facility Maintenance</h3>
					<p class="text-sm text-forest/70">
						Help keep our stables and grounds clean and safe for both horses and visitors.
					</p>
				{/snippet}
			</Card>

			<Card padding="md">
				{#snippet children()}
					<h3 class="mb-3 font-semibold text-forest">👥 Program Support</h3>
					<p class="text-sm text-forest/70">
						Assist with our therapeutic programs and weekend play sessions.
					</p>
				{/snippet}
			</Card>
		</div>
	</div>
</section>
