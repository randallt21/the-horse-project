<script lang="ts">
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";
    import { Button, Card } from "$lib/components";
    import { contactSchema, type ContactFormData } from "$lib/schemas";

    // Props from form action
    let { form } = $props<{
        form?: {
            success?: boolean;
            errors?: Record<string, string>;
            data?: Partial<ContactFormData>;
        };
    }>();

    // Get subject from URL query param if present
    const urlSubject = $page.url.searchParams.get("subject") || "";

    // Form state
    let formData = $state<Partial<ContactFormData>>({
        name: "",
        email: "",
        phone: "",
        subject: urlSubject,
        message: "",
    });

    let errors = $state<Record<string, string>>({});
    let submitted = $state(false);
    let isSubmitting = $state(false);

    const subjects = [
        "General Inquiry",
        "Programs",
        "Adoption",
        "Volunteering",
        "Donations",
        "Corporate Sponsorship",
        "Press/Media",
        "Other",
    ];

    function validateForm(): boolean {
        const result = contactSchema.safeParse(formData);
        if (!result.success) {
            errors = {};
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as string;
                errors[field] = issue.message;
            });
            console.log("Validation errors:", errors);
            return false;
        }
        errors = {};
        return true;
    }

    // Check if form was successfully submitted (via server action)
    $effect(() => {
        if (form?.success) {
            submitted = true;
            isSubmitting = false;
            // Reset form
            formData = {
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            };
        }
        if (form?.errors) {
            errors = form.errors;
            isSubmitting = false;
            // Restore previous data if available
            if (form.data) {
                formData = { ...formData, ...form.data };
            }
        }
    });

    function handleSubmit() {
        // Client-side validation first for immediate feedback
        if (!validateForm()) {
            return false; // Prevent form submission
        }
        isSubmitting = true;
        return true; // Allow form submission to server
    }
</script>

<svelte:head>
    <title>Contact Us | The Horse Project Santa Barbara</title>
    <meta
        name="description"
        content="Get in touch with The Horse Project Santa Barbara. We'd love to hear from you regarding our programs, horses, or how you can help."
    />
</svelte:head>

<!-- Hero -->
<section class="bg-forest pt-32 pb-20">
    <div class="container mx-auto px-6 text-center">
        <h1 class="mb-6 font-display text-4xl font-bold text-ivory md:text-5xl">
            Get in <span class="text-sage">Touch</span>
        </h1>
        <p class="mx-auto max-w-2xl text-lg text-ivory/70">
            Have questions about our programs, horses, or how to get involved?
            We're here to help.
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
                                Message Sent!
                            </h2>
                            <p class="mx-auto mb-6 max-w-md text-forest/70">
                                Thank you for contacting us. We've received your
                                message and will get back to you as soon as
                                possible.
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
                            <!-- Personal Info -->
                            <div>
                                <h2
                                    class="mb-4 font-display text-xl font-semibold text-forest"
                                >
                                    Contact Information
                                </h2>
                                <div
                                    class="grid grid-cols-1 gap-6 md:grid-cols-2"
                                >
                                    <div>
                                        <label
                                            for="name"
                                            class="mb-2 block text-sm font-medium text-forest"
                                        >
                                            Name *
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
                                <div
                                    class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2"
                                >
                                    <div>
                                        <label
                                            for="phone"
                                            class="mb-2 block text-sm font-medium text-forest"
                                        >
                                            Phone Number
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
                                    </div>
                                </div>
                            </div>

                            <!-- Message Details -->
                            <div>
                                <div class="mb-6">
                                    <label
                                        for="subject"
                                        class="mb-2 block text-sm font-medium text-forest"
                                    >
                                        Subject *
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        bind:value={formData.subject}
                                        class="w-full rounded-lg border px-4 py-3 {errors.subject
                                            ? 'border-red-500'
                                            : 'border-ivory-dark'} focus:border-sage focus:ring-2 focus:ring-sage/20"
                                    >
                                        <option value=""
                                            >Select a subject</option
                                        >
                                        {#each subjects as subject}
                                            <option value={subject}
                                                >{subject}</option
                                            >
                                        {/each}
                                    </select>
                                    {#if errors.subject}
                                        <p class="mt-1 text-sm text-red-500">
                                            {errors.subject}
                                        </p>
                                    {/if}
                                </div>

                                <div>
                                    <label
                                        for="message"
                                        class="mb-2 block text-sm font-medium text-forest"
                                    >
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="6"
                                        bind:value={formData.message}
                                        class="w-full rounded-lg border px-4 py-3 {errors.message
                                            ? 'border-red-500'
                                            : 'border-ivory-dark'} focus:border-sage focus:ring-2 focus:ring-sage/20"
                                    ></textarea>
                                    {#if errors.message}
                                        <p class="mt-1 text-sm text-red-500">
                                            {errors.message}
                                        </p>
                                    {/if}
                                </div>
                            </div>

                            <!-- Submit -->
                            <div class="pt-4">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    type="submit"
                                    disabled={isSubmitting}
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
                                                Sending...
                                            </span>
                                        {:else}
                                            Send Message
                                        {/if}
                                    {/snippet}
                                </Button>
                            </div>
                        </form>
                    {/snippet}
                </Card>
            {/if}
        </div>
    </div>
</section>
