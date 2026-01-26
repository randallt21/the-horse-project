<script lang="ts">
	import type { HorseStatus } from "$lib/types";

	interface Props {
		status: HorseStatus;
		size?: "sm" | "md";
		class?: string;
	}

	let { status, size = "md", class: className = "" }: Props = $props();

	const baseStyles = `
		inline-flex items-center justify-center
		font-medium rounded-full
		uppercase tracking-wide
	`;

	const statusStyles: Record<HorseStatus, string> = {
		Available: "bg-emerald-100 text-emerald-800 border border-emerald-200",
		Sanctuary: "bg-sage text-white border border-sage",
		Adopted: "bg-stone/20 text-stone border border-stone/30",
	};

	const sizeStyles = {
		sm: "px-2 py-0.5 text-xs",
		md: "px-3 py-1 text-sm",
	};

	// Use $derived for reactive class computation
	let classes = $derived(
		`${baseStyles} ${statusStyles[status]} ${sizeStyles[size]} ${className}`.trim(),
	);
</script>

<span class={classes}>
	{status === "Sanctuary" ? "DONATE TO" : status}
</span>
