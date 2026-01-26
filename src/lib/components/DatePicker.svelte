<script lang="ts">
    import { onMount } from "svelte";
    import { clickOutside } from "$lib/utils/clickOutside";

    // Props
    let {
        value = $bindable(),
        min,
        max,
        placeholder = "Select a date",
        id,
        name,
        required = false,
        error = "",
    } = $props<{
        value?: string;
        min?: string;
        max?: string;
        placeholder?: string;
        id?: string;
        name?: string;
        required?: boolean;
        error?: string;
    }>();

    // State
    let isOpen = $state(false);
    let currentMonth = $state(new Date()); // Defaults to today, but updated below
    let inputRef: HTMLInputElement;

    // Helper to get days in month
    function getDaysInMonth(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate();
    }

    // Helper to get day of week for first day (0-6)
    function getFirstDayOfMonth(year: number, month: number) {
        return new Date(year, month, 1).getDay();
    }

    // Format date YYYY-MM-DD
    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    // Format display date (e.g. Fri, Jan 26)
    function formatDisplayDate(dateStr: string): string {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }

    // Check if date is disabled (Mon-Thu or outside range)
    function isDateDisabled(year: number, month: number, day: number): boolean {
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay(); // 0=Sun, ..., 6=Sat

        // Restrict to Fri(5), Sat(6), Sun(0)
        if (dayOfWeek !== 0 && dayOfWeek !== 5 && dayOfWeek !== 6) {
            return true;
        }

        const dateStr = formatDate(date);
        if (min && dateStr < min) return true;
        if (max && dateStr > max) return true;

        // Disable past dates if no min set (default safety)
        if (!min) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (date < today) return true;
        }

        return false;
    }

    function handleSelect(year: number, month: number, day: number) {
        if (isDateDisabled(year, month, day)) return;
        const date = new Date(year, month, day);
        value = formatDate(date);
        isOpen = false;
    }

    function nextMonth() {
        currentMonth = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + 1,
            1,
        );
    }

    function prevMonth() {
        currentMonth = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() - 1,
            1,
        );
    }

    // Derived calendar grid
    let calendarDays = $derived.by(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const days: {
            day: number | null;
            disabled: boolean;
            selected: boolean;
        }[] = [];

        // Empty slots for days before first of month
        for (let i = 0; i < firstDay; i++) {
            days.push({ day: null, disabled: true, selected: false });
        }

        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const disabled = isDateDisabled(year, month, i);
            const dateStr = formatDate(new Date(year, month, i));
            const selected = value === dateStr;
            days.push({ day: i, disabled, selected });
        }

        return days;
    });

    // Initialize current month from value or min
    $effect(() => {
        if (value) {
            const date = new Date(value);
            // Only update if significantly different to avoid jumping around if user is browsing
            if (
                date.getMonth() !== currentMonth.getMonth() ||
                date.getFullYear() !== currentMonth.getFullYear()
            ) {
                currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            }
        } else if (min) {
            const date = new Date(min);
            currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        }
    });
</script>

<div class="relative w-full" use:clickOutside={() => (isOpen = false)}>
    <label for={id} class="sr-only">{placeholder}</label>
    <!-- Trigger Input -->
    <button
        type="button"
        class="w-full rounded-lg border bg-white px-4 py-3 text-left focus:border-sage focus:ring-2 focus:ring-sage/20 {error
            ? 'border-red-500'
            : 'border-ivory-dark'} {value ? 'text-forest' : 'text-forest/50'}"
        onclick={() => (isOpen = !isOpen)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
    >
        <div class="flex items-center justify-between">
            <span class={value ? "" : "text-forest/60"}
                >{value ? formatDisplayDate(value) : placeholder}</span
            >
            <svg
                class="h-5 w-5 text-forest/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
        </div>
    </button>

    <!-- Hidden input for form submission -->
    <input type="hidden" {name} bind:value />

    {#if isOpen}
        <div
            class="absolute z-50 mt-2 w-full min-w-[300px] rounded-lg border border-ivory-dark bg-white p-4 shadow-lg"
        >
            <!-- Header -->
            <div class="mb-4 flex items-center justify-between">
                <button
                    type="button"
                    class="p-1 hover:bg-sage/10 rounded-full text-forest"
                    onclick={prevMonth}
                    aria-label="Previous month"
                >
                    <svg
                        class="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
                <span class="font-semibold text-forest">
                    {currentMonth.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                    })}
                </span>
                <button
                    type="button"
                    class="p-1 hover:bg-sage/10 rounded-full text-forest"
                    onclick={nextMonth}
                    aria-label="Next month"
                >
                    <svg
                        class="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>

            <!-- Grid -->
            <div class="grid grid-cols-7 gap-1 text-center text-sm">
                <!-- Days Header -->
                {#each ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as day}
                    <div class="py-1 font-medium text-forest/50">{day}</div>
                {/each}

                <!-- Days -->
                {#each calendarDays as { day, disabled, selected }}
                    {#if day === null}
                        <div class="p-2"></div>
                    {:else}
                        <button
                            type="button"
                            class="rounded-full p-2 text-sm transition-colors
                                {selected ? 'bg-sage text-white font-bold' : ''}
                                {disabled
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'hover:bg-sage/10 text-forest cursor-pointer'}
                            "
                            {disabled}
                            onclick={() =>
                                handleSelect(
                                    currentMonth.getFullYear(),
                                    currentMonth.getMonth(),
                                    day,
                                )}
                        >
                            {day}
                        </button>
                    {/if}
                {/each}
            </div>
        </div>
    {/if}
</div>
