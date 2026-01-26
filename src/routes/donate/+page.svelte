<script lang="ts">
	import { Button, Card } from "$lib/components";
	import type { DonationFrequency, IDonationTier } from "$lib/types";

	// Donation state
	let selectedAmount = $state<number | null>(50);
	let customAmount = $state("");
	let frequency = $state<DonationFrequency>("one-time");
	let coverFees = $state(false);

	const amounts = [25, 50, 100, 250];

	const impactMessages: Record<number, string> = {
		25: "Provides a week of supplements for one horse",
		50: "Covers veterinary checkups for one horse",
		100: "Feeds a horse for an entire month",
		250: "Supports a full therapeutic session",
	};

	const sanctuaryTiers: IDonationTier[] = [
		{
			amount: 10,
			name: "Friend",
			benefit: "Newsletter updates",
		},
		{
			amount: 20,
			name: "Supporter",
			benefit: "Everything above + digital thank you",
		},
		{
			amount: 50,
			name: "Advocate",
			benefit: "Everything above + quarterly photo updates",
		},
		{
			amount: 100,
			name: "Champion",
			benefit: "Everything above + sanctuary visit",
		},
		{
			amount: 250,
			name: "Guardian",
			benefit: "Everything above + personalized video message",
		},
		{
			amount: 500,
			name: "Sanctuary Sponsor",
			benefit: "Sponsor a specific sanctuary horse",
		},
	];

	let displayAmount = $derived(
		customAmount ? parseInt(customAmount) || 0 : selectedAmount || 0,
	);

	let impactMessage = $derived(
		impactMessages[displayAmount] ||
			(displayAmount > 0
				? `Your $${displayAmount} donation makes a difference`
				: "Select an amount to see your impact"),
	);

	let totalWithFees = $derived(
		coverFees
			? Math.round(displayAmount * 1.03 * 100) / 100
			: displayAmount,
	);

	function selectAmount(amount: number) {
		selectedAmount = amount;
		customAmount = "";
	}

	function handleCustomAmount(e: Event) {
		const input = e.target as HTMLInputElement;
		customAmount = input.value.replace(/[^0-9]/g, "");
		selectedAmount = null;
	}

	function handleDonate() {
		// This is a placeholder - payment integration will be added later
		// See: docs/future/donation-integration.md
		alert(
			`Thank you for your interest in donating $${totalWithFees} (${frequency})!\n\nPayment processing coming soon. Please contact us at thehorseprojectsb@gmail.com to donate.`,
		);
	}
</script>

<svelte:head>
	<title>Donate | The Horse Project Santa Barbara</title>
	<meta
		name="description"
		content="Support The Horse Project Santa Barbara with a tax-deductible donation. Your gift helps rescue horses and fund therapeutic programs."
	/>
</svelte:head>

<!-- Hero -->
<section class="bg-forest pt-32 pb-20">
	<div class="container mx-auto px-6 text-center">
		<h1 class="mb-6 font-display text-4xl font-bold text-ivory md:text-5xl">
			Support <span class="text-sage">Our Mission</span>
		</h1>
		<p class="mx-auto max-w-2xl text-lg text-ivory/70">
			Your tax-deductible donation helps us rescue horses and provide
			healing programs for our community. Every dollar makes a difference.
		</p>
	</div>
</section>

<!-- Donation Widget -->
<section class="bg-ivory py-16">
	<div class="container mx-auto px-6">
		<div class="mx-auto max-w-2xl">
			<Card padding="lg">
				{#snippet children()}
					<!-- Frequency Toggle -->
					<div class="mb-8 flex rounded-full bg-ivory-dark p-1">
						<button
							class="flex-1 rounded-full px-6 py-3 font-medium transition-all {frequency ===
							'one-time'
								? 'bg-white text-forest shadow-md'
								: 'text-forest/60 hover:text-forest'}"
							onclick={() => (frequency = "one-time")}
						>
							One-Time
						</button>
						<button
							class="flex-1 rounded-full px-6 py-3 font-medium transition-all {frequency ===
							'monthly'
								? 'bg-white text-forest shadow-md'
								: 'text-forest/60 hover:text-forest'}"
							onclick={() => (frequency = "monthly")}
						>
							Monthly
						</button>
					</div>

					<!-- Amount Grid -->
					<div class="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
						{#each amounts as amount}
							<button
								class="rounded-xl px-6 py-4 text-lg font-semibold transition-all {selectedAmount ===
									amount && !customAmount
									? 'bg-sage text-white shadow-lg shadow-gold/30'
									: 'border-2 border-ivory-dark bg-white text-forest hover:border-sage'}"
								onclick={() => selectAmount(amount)}
							>
								${amount}
							</button>
						{/each}
					</div>

					<!-- Custom Amount -->
					<div class="mb-8">
						<label
							for="customAmount"
							class="mb-2 block text-sm font-medium text-forest"
						>
							Or enter a custom amount
						</label>
						<div class="relative">
							<span
								class="absolute top-1/2 left-4 -translate-y-1/2 text-lg text-forest/50"
							>
								$
							</span>
							<input
								type="text"
								id="customAmount"
								value={customAmount}
								oninput={handleCustomAmount}
								placeholder="Other amount"
								class="w-full rounded-xl border-2 py-4 pr-4 pl-8 {customAmount
									? 'border-sage bg-sage/5'
									: 'border-ivory-dark'} text-lg focus:border-sage focus:ring-2 focus:ring-sage/20"
							/>
						</div>
					</div>

					<!-- Impact Message -->
					<div class="mb-8 rounded-xl bg-ivory-light p-6 text-center">
						<p class="mb-2 font-semibold text-sage">Your Impact</p>
						<p class="text-forest">{impactMessage}</p>
						{#if frequency === "monthly" && displayAmount > 0}
							<p class="mt-2 text-sm text-forest/60">
								That's ${displayAmount * 12} per year supporting
								our horses!
							</p>
						{/if}
					</div>

					<!-- Cover Fees -->
					<label class="mb-8 flex cursor-pointer items-start gap-3">
						<input
							type="checkbox"
							bind:checked={coverFees}
							class="mt-1 h-5 w-5 rounded border-ivory-dark text-sage focus:ring-sage"
						/>
						<div>
							<p class="font-medium text-forest">
								Cover processing fees
							</p>
							<p class="text-sm text-forest/60">
								Add 3% so 100% of your donation goes to the
								horses
							</p>
						</div>
					</label>

					<!-- Total & Submit -->
					<div class="border-t border-ivory-dark pt-6">
						{#if displayAmount > 0}
							<div class="mb-6 flex items-center justify-between">
								<span class="text-forest/70">Total</span>
								<span class="text-2xl font-bold text-forest">
									${totalWithFees}
									{#if frequency === "monthly"}
										<span
											class="text-sm font-normal text-forest/60"
											>/month</span
										>
									{/if}
								</span>
							</div>
						{/if}

						<Button
							variant="primary"
							size="lg"
							onclick={handleDonate}
							disabled={displayAmount <= 0}
							class="w-full"
						>
							{#snippet children()}
								{#if displayAmount > 0}
									Donate ${totalWithFees}
									{frequency === "monthly"
										? "Monthly"
										: "Now"}
								{:else}
									Select an Amount
								{/if}
							{/snippet}
						</Button>

						<p class="mt-4 text-center text-sm text-forest/50">
							🔒 Secure, tax-deductible donation
						</p>
					</div>
				{/snippet}
			</Card>

			<!-- Payment Methods Note -->
			<div class="mt-6 text-center">
				<p class="text-sm text-forest/60">
					Payment integration coming soon. For immediate donations,
					please contact us at
					<a
						href="/contact?subject=Donations"
						class="text-sage hover:underline"
					>
						Contact Us
					</a>
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Sanctuary Horse's Circle -->
<section class="bg-sage py-24 text-forest">
	<div class="container mx-auto px-6">
		<div class="mb-12 text-center">
			<h2 class="mb-4 font-display text-3xl font-bold">
				Sanctuary Horse's Circle
			</h2>
			<p class="mx-auto max-w-2xl text-forest/80">
				Join our monthly giving program and become part of our inner
				circle. Your recurring support provides the stability our
				sanctuary horses need.
			</p>
		</div>

		<div
			class="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
		>
			{#each sanctuaryTiers as tier}
				<Card variant="default" padding="md" hover={true}>
					{#snippet children()}
						<div class="text-center">
							<p class="mb-1 text-2xl font-bold text-forest">
								${tier.amount}
							</p>
							<p class="mb-3 text-sm text-forest/60">/month</p>
							<h3
								class="mb-3 font-display text-xl font-semibold text-forest"
							>
								{tier.name}
							</h3>
							<p class="text-sm text-forest/70">{tier.benefit}</p>
						</div>
					{/snippet}
				</Card>
			{/each}
		</div>
	</div>
</section>

<!-- Other Ways to Give -->
<section class="bg-ivory py-24">
	<div class="container mx-auto px-6">
		<div class="mb-12 text-center">
			<h2 class="mb-4 font-display text-3xl font-bold text-forest">
				Other Ways to Give
			</h2>
		</div>

		<div
			class="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
		>
			<Card padding="lg">
				{#snippet children()}
					<h3
						class="mb-3 font-display text-xl font-semibold text-forest"
					>
						📦 In-Kind Donations
					</h3>
					<p class="mb-4 text-forest/70">
						We accept hay, feed, medical supplies, and other items
						our horses need.
					</p>
					<Button
						href="https://www.amazon.com/hz/wishlist/ls/18MY9X7RW8Q4G"
						variant="secondary"
						class="w-full sm:w-auto"
					>
						{#snippet children()}
							Amazon Wishlist
						{/snippet}
					</Button>
				{/snippet}
			</Card>

			<Card padding="lg">
				{#snippet children()}
					<h3
						class="mb-3 font-display text-xl font-semibold text-forest"
					>
						📫 Mail a Check
					</h3>
					<div class="mb-4 text-sm text-forest/70 space-y-1">
						<p class="font-semibold text-forest">
							Make payable to:
						</p>
						<p class="mb-2">THE HORSE PROJECT</p>

						<p class="font-semibold text-forest mt-3">Mail to:</p>
						<p>The Horse Project</p>
						<p>Players Philanthropy Fund</p>
						<p>ATTN: Stephanie Steelman</p>
						<p>1122 Kenilworth Drive STE #201</p>
						<p>Towson, MD 21204</p>
					</div>
				{/snippet}
			</Card>

			<Card padding="lg">
				{#snippet children()}
					<h3
						class="mb-3 font-display text-xl font-semibold text-forest"
					>
						🏢 Corporate Sponsors
					</h3>
					<p class="mb-4 text-forest/70">
						Partner with us for corporate giving opportunities and
						team retreats.
					</p>
					<Button
						href="/contact?subject=Corporate%20Sponsorship"
						variant="secondary"
						class="w-full sm:w-auto"
					>
						{#snippet children()}
							Become a Partner
						{/snippet}
					</Button>
				{/snippet}
			</Card>
		</div>
	</div>
</section>

<!-- Tax Info -->
<section class="bg-ivory-light py-16">
	<div class="container mx-auto px-6">
		<div class="mx-auto max-w-3xl text-center">
			<p class="text-sm leading-relaxed text-forest/60">
				The Horse Project Santa Barbara operates under the fiscal
				sponsorship of the Players Philanthropy Fund, a 501(c)(3) public
				charity. Your donation is tax-deductible to the full extent
				allowed by law. You will receive a receipt for your records
				after your gift is processed.
			</p>
		</div>
	</div>
</section>
