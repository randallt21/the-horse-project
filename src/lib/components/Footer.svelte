<script lang="ts">
	const currentYear = 2007;

	const quickLinks = [
		{ label: "About Us", href: "/about" },
		{ label: "Our Horses", href: "/horses" },
		{ label: "Programs", href: "/programs" },
		{ label: "Volunteer", href: "/join" },
		{ label: "Donate", href: "/donate" },
	];

	const contactInfo = {
		location: "Santa Barbara, California",
		email: "thehorseprojectsb@gmail.com",
	};
</script>

<footer class="bg-forest text-ivory">
	<div class="container mx-auto px-6 py-16">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-3">
			<!-- Brand -->
			<div>
				<h3 class="mb-4 font-display text-2xl font-bold">
					The Horse Project
				</h3>
				<p class="mb-6 leading-relaxed text-ivory/70">
					People helping horses and horses helping people. A 501(c)(3)
					nonprofit dedicated to rescuing horses and providing
					therapeutic programs.
				</p>
				<p class="text-sm text-ivory/50">
					Operating under the fiscal sponsorship of the<br />
					<span class="text-sage">Players Philanthropy Fund</span>
				</p>
			</div>

			<!-- Quick Links -->
			<div>
				<h4 class="mb-4 font-display text-lg font-semibold text-sage">
					Quick Links
				</h4>
				<ul class="space-y-3">
					{#each quickLinks as link}
						<li>
							<a
								href={link.href}
								class="text-ivory/70 transition-colors hover:text-sage"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact -->
			<div>
				<h4 class="mb-4 font-display text-lg font-semibold text-sage">
					Visit Us
				</h4>
				<ul class="space-y-3 text-ivory/70">
					<li class="flex items-start gap-3">
						<svg
							class="mt-0.5 h-5 w-5 text-sage"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						<span>{contactInfo.location}</span>
					</li>

					<li class="flex items-start gap-3">
						<svg
							class="mt-0.5 h-5 w-5 text-sage"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
						<span class="break-all">
							<a
								href="mailto:{contactInfo.email}"
								class="text-ivory/70 transition-colors hover:text-sage"
							>
								{contactInfo.email}
							</a>
						</span>
					</li>
				</ul>

				<!-- Social Links Placeholder -->
				<div class="mt-6 flex gap-4">
					<a
						href="https://www.facebook.com/TheHorseProject/"
						target="_blank"
						rel="noopener noreferrer"
						class="flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 text-sage transition-all hover:scale-110 hover:bg-sage hover:text-forest hover:shadow-lg"
						aria-label="Facebook"
					>
						<svg
							class="h-5 w-5"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
							/>
						</svg>
					</a>
					<a
						href="https://www.instagram.com/thehorseprojectsb/?hl=en"
						target="_blank"
						rel="noopener noreferrer"
						class="flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 text-sage transition-all hover:scale-110 hover:bg-sage hover:text-forest hover:shadow-lg"
						aria-label="Instagram"
					>
						<svg
							class="h-5 w-5"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div
			class="mt-12 border-t border-ivory/10 pt-8 text-center text-sm text-ivory/50"
		>
			<p>
				© {currentYear} The Horse Project Santa Barbara. All rights reserved.
			</p>
			<p class="mt-2">
				A 501(c)(3) nonprofit organization. Tax ID provided upon
				request.
			</p>
		</div>
	</div>
</footer>
