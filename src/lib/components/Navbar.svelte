<script lang="ts">
	import type { INavLink } from "$lib/types";
	import Button from "./Button.svelte";

	const navLinks: INavLink[] = [
		{ label: "Home", href: "/" },
		{ label: "About", href: "/about" },
		{ label: "Horses", href: "/horses" },
		{ label: "Programs", href: "/programs" },
		{ label: "Volunteer", href: "/join" },
		{ label: "Contact", href: "/contact" },
	];

	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);

	function handleScroll() {
		scrolled = window.scrollY > 50;
	}
</script>

<svelte:window onscroll={handleScroll} />

<nav
	class="fixed top-0 right-0 left-0 z-50 py-3 transition-all duration-300 {scrolled
		? 'bg-ivory/95 shadow-md backdrop-blur-md'
		: 'bg-transparent'}"
>
	<div class="container mx-auto flex items-center justify-between px-6">
		<!-- Logo -->
		<a href="/" class="group flex items-center gap-3">
			<img
				src={scrolled
					? "/horse-logo-forest.png"
					: "/horse-logo-white.png"}
				alt="The Horse Project"
				class="h-12 w-auto transition-all duration-300"
			/>
			<span
				class="font-display text-2xl font-bold transition-colors {scrolled
					? 'text-forest'
					: 'text-white'} group-hover:text-sage"
			>
				The Horse Project
			</span>
		</a>

		<!-- Desktop Navigation -->
		<div class="hidden items-center gap-8 md:flex">
			{#each navLinks as link}
				<a
					href={link.href}
					class="font-medium transition-colors {scrolled
						? 'text-forest'
						: 'text-white'} hover:text-sage"
				>
					{link.label}
				</a>
			{/each}
			<Button variant="primary" size="sm" href="/donate">
				{#snippet children()}
					Donate
				{/snippet}
			</Button>
		</div>

		<!-- Mobile Menu Button -->
		<button
			class="p-2 md:hidden {scrolled ? 'text-forest' : 'text-white'}"
			onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			aria-label="Toggle menu"
		>
			<svg
				class="h-6 w-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				{#if mobileMenuOpen}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				{:else}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				{/if}
			</svg>
		</button>
	</div>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div
			class="mt-3 border-t border-ivory-dark bg-ivory shadow-xl md:hidden"
		>
			<div class="container mx-auto flex flex-col gap-4 px-6 py-4">
				{#each navLinks as link}
					<a
						href={link.href}
						class="py-2 font-medium text-forest hover:text-sage"
						onclick={() => (mobileMenuOpen = false)}
					>
						{link.label}
					</a>
				{/each}
				<Button
					variant="primary"
					href="/donate"
					onclick={() => (mobileMenuOpen = false)}
				>
					{#snippet children()}
						Donate
					{/snippet}
				</Button>
			</div>
		</div>
	{/if}
</nav>
