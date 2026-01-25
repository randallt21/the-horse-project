# Future Integration: Donation System

> **Status:** Deferred — Core website must be completed first.  
> **Prerequisites:** Website deployed, Cloudflare Pages configured, domain verified.

---

## Overview

This document covers setting up payment processing for The Horse Project Santa Barbara, a 501(c)(3) nonprofit. The goal is to accept donations with minimal processing fees by using platforms where donors can cover fees.

---

## Recommended Platform: Givebutter

**Why Givebutter?**

- No platform fees (only payment processing)
- 95% of donors choose to cover processing fees → effectively free
- Built-in 501(c)(3) tax receipts
- Apple Pay / Google Pay support
- Embeddable widget for easy integration

### Setup Steps

1. **Create Givebutter Account**
   - Go to [givebutter.com](https://givebutter.com)
   - Sign up as a nonprofit
   - Verify 501(c)(3) status (via Players Philanthropy Fund fiscal sponsorship)

2. **Configure Campaign**
   - Create a "General Donations" campaign
   - Set up donation tiers matching the website:
     - $25, $50, $100, $250 (one-time)
     - "The Circle" monthly tiers ($10-$700)
   - Add impact descriptions (e.g., "$50 = one week of hay")

3. **Get Embed Code**

   ```html
   <script src="https://widgets.givebutter.com/latest.umd.cjs?acct=YOUR_ORG_ID&p=donate"></script>
   <givebutter-widget id="donate"></givebutter-widget>
   ```

4. **Integrate with Website**
   - Add embed code to `src/routes/donate/+page.svelte`
   - Style container to match Cream and Black theme
   - Test donation flow in sandbox mode

5. **Configure Tax Receipts**
   - In Givebutter dashboard → Settings → Receipts
   - Add 501(c)(3) disclosure text:
     > "The Horse Project is a 501(c)(3) non-profit organization operating under the fiscal sponsorship of the Players Philanthropy Fund. No goods or services were provided in exchange for this contribution."

---

## Alternative: Donorbox

If Givebutter doesn't meet requirements, Donorbox is a solid alternative.

**Pros:**

- 1.75% platform fee (lower than Stripe)
- Donors can cover fees
- Recurring donation support
- Embeddable forms

### Setup Steps

1. Create account at [donorbox.org](https://donorbox.org)
2. Verify nonprofit status
3. Create donation campaign
4. Get embed code:
   ```html
   <script src="https://donorbox.org/widget.js" paypalExpress="false"></script>
   <iframe
   	src="https://donorbox.org/embed/campaign-name"
   	name="donorbox"
   	allowpaymentrequest="allowpaymentrequest"
   	seamless="seamless"
   	frameborder="0"
   	scrolling="no"
   	height="900px"
   	width="100%"
   	style="max-width: 500px; min-width: 250px;"
   >
   </iframe>
   ```
5. Integrate into donate page

---

## Alternative: Custom Stripe Integration

For maximum control and branding, use Stripe directly with `svelte-stripe`.

**Pros:**

- Full UI customization
- Apple Pay / Google Pay via Payment Element
- Nonprofit discount (2.2% + $0.30)

**Cons:**

- More complex implementation
- Donors cannot cover fees (would need custom logic)

### Setup Steps

1. **Create Stripe Account**
   - Go to [stripe.com](https://stripe.com)
   - Apply for nonprofit discount
   - Get API keys (test mode first)

2. **Install Dependencies**

   ```bash
   npm install stripe svelte-stripe
   ```

3. **Configure Environment Variables**

   ```env
   STRIPE_SECRET_KEY=sk_test_...
   PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

4. **Create Payment Intent Endpoint**

   `src/routes/donate/+page.server.ts`:

   ```typescript
   import Stripe from 'stripe';
   import type { Actions } from './$types';

   export const actions: Actions = {
   	createPaymentIntent: async ({ request, platform }) => {
   		const stripe = new Stripe(platform.env.STRIPE_SECRET_KEY);
   		const data = await request.formData();
   		const amount = Number(data.get('amount')) * 100; // cents

   		const paymentIntent = await stripe.paymentIntents.create({
   			amount,
   			currency: 'usd',
   			automatic_payment_methods: { enabled: true }
   		});

   		return { clientSecret: paymentIntent.client_secret };
   	}
   };
   ```

5. **Create Payment Component**

   `src/lib/components/StripePayment.svelte`:

   ```svelte
   <script lang="ts">
   	import { loadStripe } from '@stripe/stripe-js';
   	import { Elements, PaymentElement } from 'svelte-stripe';
   	import { PUBLIC_STRIPE_PUBLISHABLE_KEY } from '$env/static/public';

   	export let clientSecret: string;

   	const stripe = loadStripe(PUBLIC_STRIPE_PUBLISHABLE_KEY);
   </script>

   <Elements {stripe} {clientSecret}>
   	<PaymentElement />
   	<button type="submit">Donate</button>
   </Elements>
   ```

6. **Configure Tax Receipts**
   - Stripe Dashboard → Settings → Branding
   - Add logo and 501(c)(3) text
   - Enable automatic receipt emails

---

## Scaffolding in Current Website

The donate page (`/donate`) includes UI scaffolding:

- Amount selection grid ($25, $50, $100, $250)
- Custom amount input
- One-time / Monthly toggle
- Impact context text
- Sanctuary Horse's Circle tiers

**Current State:** UI only, no payment processing.

**To Enable Payments:**

1. Choose platform (Givebutter recommended)
2. Follow setup steps above
3. Replace placeholder in `src/routes/donate/+page.svelte` with embed code

---

## Checklist

- [ ] Choose payment platform (Givebutter / Donorbox / Stripe)
- [ ] Create account and verify nonprofit status
- [ ] Configure donation tiers and impact descriptions
- [ ] Get embed code or API keys
- [ ] Integrate with donate page
- [ ] Configure tax receipt settings
- [ ] Test donation flow (test mode)
- [ ] Process test donations
- [ ] Switch to production mode
- [ ] Announce to donors!
