<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		variant?: "default" | "glass" | "dark";
		padding?: "sm" | "md" | "lg";
		hover?: boolean;
		class?: string;
		children: Snippet;
	}

	let {
		variant = "default",
		padding = "md",
		hover = true,
		class: className = "",
		children,
	}: Props = $props();

	const baseStyles = `
		rounded-xl
		transition-all duration-300 ease-out
	`;

	const variantStyles = {
		default: `
			bg-white shadow-md
			border border-stone/30
		`,
		glass: `
			bg-white/70 backdrop-blur-md
			border border-white/20
			shadow-lg
		`,
		dark: `
			bg-forest text-ivory
			border border-forest
		`,
	};

	const paddingStyles = {
		sm: "p-4",
		md: "p-6",
		lg: "p-8",
	};

	// Use $derived for reactive class computation
	let hoverStyles = $derived(
		hover
			? `hover:shadow-xl hover:-translate-y-1 hover:border-sage/30`
			: "",
	);

	let classes = $derived(
		`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`.trim(),
	);
</script>

<div class={classes}>
	{@render children()}
</div>
