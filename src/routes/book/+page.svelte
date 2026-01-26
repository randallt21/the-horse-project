<script lang="ts">
    import { enhance } from "$app/forms";
    import { Button, Card, DatePicker } from "$lib/components";
    import { bookingSchema, type BookingFormData } from "$lib/schemas";

    // Props from form action
    let { form } = $props<{
        form?: {
            success?: boolean;
            errors?: Record<string, string>;
            data?: Partial<BookingFormData>;
        };
    }>();

    // Form state
    let formData = $state<Partial<BookingFormData>>({
        name: "",
        email: "",
        phone: "",
        date: "",
        guests: 1,
        totalAmount: 65,
    });

    let errors = $state<Record<string, string>>({});
    let submitted = $state(false);
    let isSubmitting = $state(false);

    // Derived
    let totalAmount = $derived((formData.guests || 1) * 65);

    // Date handling
    // Only allow Fri/Sat/Sun
    // This is a simple client-side check, robust usage would use a date picker library
    // For now we trust HTML5 date input but add validation
    // Date handling
    // DatePicker component now handles restricted days (Fri/Sat/Sun) logic

    function validateForm(): boolean {
        // Update total before validating
        formData.totalAmount = totalAmount;

        const result = bookingSchema.safeParse(formData);
        if (!result.success) {
            errors = {};
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as string;
                errors[field] = issue.message;
            });
            return false;
        }

        // Custom date check again to be safe
        if (formData.date) {
            const date = new Date(formData.date);
            const day = date.getUTCDay();
            if (day !== 0 && day !== 5 && day !== 6) {
                errors.date =
                    "Sessions are only available on Friday, Saturday, and Sunday.";
                return false;
            }
        }

        errors = {};
        return true;
    }

    // Check if form was successfully submitted (via server action)
    $effect(() => {
        if (form?.success) {
            submitted = true;
            isSubmitting = false;
        }
        if (form?.errors) {
            errors = form.errors;
            isSubmitting = false;
        }
    });

    function handleSubmit() {
        if (!validateForm()) {
            return false;
        }
        isSubmitting = true;
        return true;
    }
</script>

<svelte:head>
    <title>Book Your Session | The Horse Project Santa Barbara</title>
    <meta
        name="description"
        content="Book your 'Play With Rescued Horses' session. Experience a magical morning with our rescued horses."
    />
</svelte:head>

<!-- Hero -->
<section class="bg-forest pt-32 pb-20">
    <div class="container mx-auto px-6 text-center">
        <h1 class="mb-6 font-display text-4xl font-bold text-ivory md:text-5xl">
            Book Your <span class="text-sage">Session</span>
        </h1>
        <p class="mx-auto max-w-2xl text-lg text-ivory/70">
            Play With Rescued Horses - A unique experience of connection and
            healing.
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
                            <h2
                                class="mb-4 font-display text-2xl font-bold text-forest"
                            >
                                Booking Confirmed!
                            </h2>
                            <p class="mx-auto mb-6 max-w-md text-forest/70">
                                Thank you for booking your session. We've sent a
                                confirmation email with all the details and
                                directions to the sanctuary.
                            </p>
                            <div
                                class="mb-8 rounded-lg bg-ivory-light p-6 text-left"
                            >
                                <h3
                                    class="mb-4 font-semibold text-forest border-b border-ivory-dark pb-2"
                                >
                                    Receipt
                                </h3>
                                <div class="flex justify-between mb-2">
                                    <span class="text-forest/70"
                                        >Booking Date:</span
                                    >
                                    <span class="font-medium text-forest"
                                        >{formData.date}</span
                                    >
                                </div>
                                <div class="flex justify-between mb-2">
                                    <span class="text-forest/70">Time:</span>
                                    <span class="font-medium text-forest"
                                        >9:30 AM - 12:00 PM</span
                                    >
                                </div>
                                <div class="flex justify-between mb-2">
                                    <span class="text-forest/70">Guests:</span>
                                    <span class="font-medium text-forest"
                                        >{formData.guests}</span
                                    >
                                </div>
                                <div
                                    class="flex justify-between pt-2 border-t border-ivory-dark mt-2"
                                >
                                    <span class="font-bold text-forest"
                                        >Total Paid:</span
                                    >
                                    <span class="font-bold text-forest"
                                        >${formData.totalAmount ??
                                            totalAmount}</span
                                    >
                                </div>
                            </div>
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
                        <form
                            method="POST"
                            use:enhance={({ cancel }) => {
                                if (!handleSubmit()) {
                                    cancel();
                                }
                                return async ({ update }) => {
                                    await update();
                                };
                            }}
                            class="space-y-8"
                        >
                            <input
                                type="hidden"
                                name="totalAmount"
                                value={totalAmount}
                            />

                            <!-- Session Details -->
                            <div>
                                <h2
                                    class="mb-4 font-display text-xl font-semibold text-forest"
                                >
                                    Session Details
                                </h2>
                                <div
                                    class="grid grid-cols-1 gap-6 md:grid-cols-2"
                                >
                                    <div>
                                        <label
                                            for="date"
                                            class="mb-2 block text-sm font-medium text-forest"
                                        >
                                            Select Date * <span
                                                class="text-xs font-normal text-forest/60"
                                                >(Fri, Sat, Sun • 9:30 AM -
                                                12:00 PM)</span
                                            >
                                        </label>
                                        <DatePicker
                                            id="date"
                                            name="date"
                                            bind:value={formData.date}
                                            min={new Date()
                                                .toISOString()
                                                .split("T")[0]}
                                            placeholder="Select a date"
                                            error={errors.date}
                                        />
                                        {#if errors.date}
                                            <p
                                                class="mt-1 text-sm text-red-500"
                                            >
                                                {errors.date}
                                            </p>
                                        {/if}
                                    </div>
                                    <div>
                                        <label
                                            for="guests"
                                            class="mb-2 block text-sm font-medium text-forest"
                                        >
                                            Number of Guests * <span
                                                class="text-xs font-normal text-forest/60"
                                                >($65/person)</span
                                            >
                                        </label>
                                        <div class="flex items-center">
                                            <button
                                                type="button"
                                                class="px-4 py-3 border border-r-0 border-ivory-dark rounded-l-lg hover:bg-ivory-light"
                                                onclick={() => {
                                                    const current =
                                                        formData.guests || 1;
                                                    if (current > 1)
                                                        formData.guests =
                                                            current - 1;
                                                }}>-</button
                                            >
                                            <input
                                                type="number"
                                                id="guests"
                                                name="guests"
                                                bind:value={formData.guests}
                                                min="1"
                                                max="10"
                                                readonly
                                                class="w-full text-center border-y border-x-0 border-ivory-dark py-3 focus:outline-none"
                                            />
                                            <button
                                                type="button"
                                                class="px-4 py-3 border border-l-0 border-ivory-dark rounded-r-lg hover:bg-ivory-light"
                                                onclick={() => {
                                                    const current =
                                                        formData.guests || 1;
                                                    if (current < 10)
                                                        formData.guests =
                                                            current + 1;
                                                }}>+</button
                                            >
                                        </div>
                                        {#if errors.guests}
                                            <p
                                                class="mt-1 text-sm text-red-500"
                                            >
                                                {errors.guests}
                                            </p>
                                        {/if}
                                    </div>
                                </div>

                                <div
                                    class="mt-4 p-4 bg-sage/10 rounded-lg flex justify-between items-center"
                                >
                                    <div>
                                        <p class="font-semibold text-forest">
                                            Total Amount
                                        </p>
                                        <p class="text-sm text-forest/60">
                                            {formData.guests} guest(s) x $65
                                        </p>
                                    </div>
                                    <p class="text-2xl font-bold text-forest">
                                        ${totalAmount}
                                    </p>
                                </div>
                            </div>

                            <!-- Personal Info -->
                            <div>
                                <h2
                                    class="mb-4 font-display text-xl font-semibold text-forest"
                                >
                                    Your Information
                                </h2>
                                <div
                                    class="grid grid-cols-1 gap-6 md:grid-cols-2"
                                >
                                    <div>
                                        <label
                                            for="name"
                                            class="mb-2 block text-sm font-medium text-forest"
                                        >
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            bind:value={formData.name}
                                            class="w-full rounded-lg border px-4 py-3 {errors.name
                                                ? 'border-red-500'
                                                : 'border-ivory-dark'} focus:border-sage focus:ring-2 focus:ring-sage/20"
                                        />
                                        {#if errors.name}
                                            <p
                                                class="mt-1 text-sm text-red-500"
                                            >
                                                {errors.name}
                                            </p>
                                        {/if}
                                    </div>
                                    <div>
                                        <label
                                            for="email"
                                            class="mb-2 block text-sm font-medium text-forest"
                                        >
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            bind:value={formData.email}
                                            class="w-full rounded-lg border px-4 py-3 {errors.email
                                                ? 'border-red-500'
                                                : 'border-ivory-dark'} focus:border-sage focus:ring-2 focus:ring-sage/20"
                                        />
                                        {#if errors.email}
                                            <p
                                                class="mt-1 text-sm text-red-500"
                                            >
                                                {errors.email}
                                            </p>
                                        {/if}
                                    </div>
                                </div>
                                <div class="mt-6">
                                    <label
                                        for="phone"
                                        class="mb-2 block text-sm font-medium text-forest"
                                    >
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        bind:value={formData.phone}
                                        class="w-full rounded-lg border px-4 py-3 {errors.phone
                                            ? 'border-red-500'
                                            : 'border-ivory-dark'} focus:border-sage focus:ring-2 focus:ring-sage/20"
                                    />
                                    {#if errors.phone}
                                        <p class="mt-1 text-sm text-red-500">
                                            {errors.phone}
                                        </p>
                                    {/if}
                                </div>
                            </div>

                            <!-- Mock Payment -->
                            <div class="border-t border-ivory-dark pt-6">
                                <h2
                                    class="mb-4 font-display text-xl font-semibold text-forest"
                                >
                                    Payment Method
                                </h2>
                                <div
                                    class="rounded-xl border border-ivory-dark p-6 bg-white"
                                >
                                    <div
                                        class="mb-4 flex items-center gap-2 text-forest/60 text-sm"
                                    >
                                        <svg
                                            class="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            ><path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            ></path></svg
                                        >
                                        Secure Payment Processing (Mock)
                                    </div>
                                    <div class="grid grid-cols-1 gap-4">
                                        <div>
                                            <label
                                                class="mb-2 block text-xs font-semibold uppercase tracking-wider text-forest/60"
                                            >
                                                Card Number
                                            </label>
                                            <div class="relative">
                                                <input
                                                    id="card_number"
                                                    type="text"
                                                    placeholder="0000 0000 0000 0000"
                                                    class="w-full rounded-lg border border-ivory-dark px-4 py-3 pl-10 focus:border-sage focus:ring-2 focus:ring-sage/20"
                                                />
                                                <svg
                                                    class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    ><path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                                    ></path></svg
                                                >
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-2 gap-4">
                                            <div>
                                                <label
                                                    for="card_expiry"
                                                    class="mb-2 block text-xs font-semibold uppercase tracking-wider text-forest/60"
                                                >
                                                    Expiry
                                                </label>
                                                <input
                                                    id="card_expiry"
                                                    type="text"
                                                    placeholder="MM / YY"
                                                    class="w-full rounded-lg border border-ivory-dark px-4 py-3 focus:border-sage focus:ring-2 focus:ring-sage/20"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    for="card_cvc"
                                                    class="mb-2 block text-xs font-semibold uppercase tracking-wider text-forest/60"
                                                >
                                                    CVC
                                                </label>
                                                <input
                                                    id="card_cvc"
                                                    type="text"
                                                    placeholder="123"
                                                    class="w-full rounded-lg border border-ivory-dark px-4 py-3 focus:border-sage focus:ring-2 focus:ring-sage/20"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Submit -->
                            <div class="pt-4">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    type="submit"
                                    disabled={isSubmitting}
                                    class="w-full"
                                >
                                    {#snippet children()}
                                        {#if isSubmitting}
                                            <span
                                                class="flex items-center gap-2"
                                            >
                                                <svg
                                                    class="h-5 w-5 animate-spin"
                                                    viewBox="0 0 24 24"
                                                >
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
                                                Processing Payment...
                                            </span>
                                        {:else}
                                            Pay ${totalAmount} & Book Session
                                        {/if}
                                    {/snippet}
                                </Button>
                                <p
                                    class="mt-4 text-center text-sm text-forest/50"
                                >
                                    Life happens! If you can't make your
                                    session, just let us know as soon as you can
                                    and we'll happily help you reschedule.
                                </p>
                            </div>
                        </form>
                    {/snippet}
                </Card>
            {/if}
        </div>
    </div>
</section>
