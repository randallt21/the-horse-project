<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		variant?: "primary" | "secondary" | "ghost";
		size?: "sm" | "md" | "lg";
		href?: string;
		disabled?: boolean;
		type?: "button" | "submit" | "reset";
		class?: string;
		children: Snippet;
		onclick?: (e: MouseEvent) => void;
	}

	let {
		variant = "primary",
		size = "md",
		href,
		disabled = false,
		type = "button",
		class: className = "",
		children,
		onclick,
	}: Props = $props();

	const baseStyles = `
		inline-flex items-center justify-center font-medium
		transition-all duration-200 ease-out
		focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2
		disabled:opacity-50 disabled:cursor-not-allowed
		rounded-full
	`;

	const variantStyles = {
		primary: `
			bg-sage text-white border-2 border-transparent
			hover:bg-ivory hover:text-forest hover:border-forest
			active:scale-[0.98]
		`,
		secondary: `
			bg-ivory text-forest border-2 border-forest
			hover:bg-forest hover:text-ivory
			active:scale-[0.98]
		`,
		ghost: `
			bg-transparent text-forest
			hover:bg-forest/5
			active:bg-forest/10
		`,
	};

	const sizeStyles = {
		sm: "px-4 py-2 text-sm",
		md: "px-6 py-3 text-base",
		lg: "px-8 py-4 text-lg",
	};

	// Use $derived for reactive class computation
	let classes = $derived(
		`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim(),
	);
</script>

{#if href && !disabled}
	<a {href} class={classes}>
		{@render children()}
	</a>
{:else}
	<button {type} {disabled} class={classes} {onclick}>
		{@render children()}
	</button>
{/if}
