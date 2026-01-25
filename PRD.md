# Digital Transformation & Technical Specification: The Horse Project Santa Barbara

---

## 1. Executive Summary and Strategic Vision

The revitalization of The Horse Project Santa Barbara's digital presence represents a pivotal shift from a static informational repository to a dynamic, high-performance operational platform. As a 501(c)(3) non-profit organization operating under the fiscal sponsorship of the Players Philanthropy Fund, the project's digital footprint is not merely a marketing asset but a critical infrastructure component for revenue generation, volunteer recruitment, and community education.

The current digital landscape for charitable organizations demands a user experience (UX) that rivals commercial sectors—characterized by speed, emotional resonance, and seamless transactional capability. A "classic well-designed website" in the modern era implies an architecture that is invisible to the user yet robust in its delivery, ensuring that the narrative of "People helping horses and horses helping people" takes center stage without technological friction.

This comprehensive technical specification outlines the architecture for a high-performance, edge-deployed web application utilizing SvelteKit and Cloudflare. This stack is specifically selected to meet the requirement for a "modernized" platform that natively leverages edge computing for superior performance and security.

### Core Objectives

- Transition from the legacy site to an interactive, narrative-driven experience
- Capture the visceral joy of the human-horse connection through cinematic video backgrounds and immersive "scrollytelling" interfaces
- Automate volunteer intake flows and optimize donor conversion paths with frictionless payment technologies like Apple Pay and Google Pay
- Project institutional maturity and sophistication through a "Cream and Black" minimalist aesthetic

This report serves as a definitive **Project Requirement Document (PRD) and architectural blueprint**. It synthesizes deep research into the existing content structures—preserving vital information about programs like "Better With Horses" and resident horses like Anjo and Jalisco—while reimagining the user journey through the lens of modern software engineering principles.

It details:

- Implementation of Object-Oriented Programming (OOP) within the SvelteKit framework
- Strategic use of TypeScript for reliability
- Deployment of serverless functions to handle sensitive logic such as donation processing and data validation

---

## 2. Comprehensive Legacy Site Audit and Content Migration Strategy

A successful modernization effort begins with a granular understanding of the existing digital assets. The current website serves as the single source of truth for the organization's history, mission, and operational details. We must meticulously migrate this content while restructuring it to improve discoverability and emotional impact.

### 2.1 Core Information Architecture

The existing sitemap reveals a structure rooted in traditional navigation patterns:

- Home
- About
- Events
- Better With Horses
- Available Horses
- Sponsor
- Join Us
- Services
- News
- Contact

While functional, this structure segregates related content. For instance, "Sponsor" and "Available Horses" are intrinsically linked but currently separated. The redesign will unify these narratives.

**Migration Strategy:** Extract the rich textual history—specifically the organization's dual mission of rescuing abandoned horses to help them while simultaneously using those horses to facilitate human healing—and elevate it from dense paragraphs into visual storytelling elements.

### 2.2 Programmatic Content Analysis

The "Better With Horses" program is a flagship offering that requires significant visibility. Currently, it details therapeutic interventions for diverse groups, including:

- A specialized pilot program for Women Veterans
- Collaborations with organizations like Blind Fitness
- 10-week courses and weekend retreats where participants engage in "fun work" in the arena to build emotional intelligence and leadership skills

The new site must not only list these details but **visually demonstrate the impact** through the integration of media assets, such as the KEYT Channel 5 news feature which showcases blind participants navigating obstacle courses. This moves the user from passive reading to active witnessing of the program's efficacy.

### 2.3 The Equine Inventory: From Lists to Personalities

The "Available Horses" and "Sanctuary Horse's Circle" sections act as the emotional heart of the platform.

**Current State:**

- Adoptable horses (e.g., Anjo, Jalisco)
- Sanctuary residents (e.g., Savannah, Diego, Ruby)

**Redesign Approach:**
Transform static entries into dynamic **"Personality Profiles."** Each horse will be treated as a unique entity within the software architecture, with attributes for:

- Age
- Breed
- History
- Sponsorship status

The migration will ensure that specific stories—such as Savannah being a trauma survivor or Ruby being the herd leader—are preserved and highlighted using the new design system's emphasis on high-quality imagery and typography.

### 2.4 Operational Content: Volunteers and Events

The "Join Us" section currently houses:

- Volunteer application
- Event information

**Volunteer Application Data Points:**

- Name, contact info, bio
- Specific availability (e.g., Mon AM 9-12, Mon PM 3-5)

**"Play With Rescued Horses" Event:**

- Schedule: Fridays, Saturdays, and Sundays from 9:30 AM to Noon
- Fee: $65

The modernization will transition these from static text fields into interactive, validated software objects. The specific shift times will be encoded as enums in TypeScript to ensure data consistency, and the event schedule will be migrated to a structured data format (JSON) that can feed both the frontend UI and the SEO schema.

---

## 3. Technical Architecture: The Edge-First Stack

To fulfill the requirement for a "modernized" site deployed to Cloudflare, we define an architecture that leverages the full capabilities of the "Edge." Traditional web hosting involves a centralized server that processes requests and sends HTML back to the user. This introduces latency, especially for users geographically distant from the data center.

Our proposed architecture uses **Cloudflare Pages combined with SvelteKit**, utilizing the global distribution network to serve the application from a location closest to the user.

### 3.1 The Framework: SvelteKit

SvelteKit is selected as the meta-framework due to its unique compilation strategy and alignment with the project's performance goals.

**Key Advantages:**

- Unlike React or Vue, which ship a heavy runtime to the browser to manage a Virtual DOM, Svelte compiles components into highly efficient, imperative vanilla JavaScript during the build process
- Significantly smaller bundle sizes—crucial for a non-profit website where users may be accessing via mobile networks or older devices

**Hybrid Rendering Capabilities:**

- Marketing pages like "Home" or "About" → Prerendered (SSG) for instant loading
- Dynamic pages like "Volunteer" or "Donate" → Server-Side Rendering (SSR) at the edge

This flexibility ensures that the site is incredibly fast while remaining fully dynamic where necessary.

### 3.2 The Platform: Cloudflare Ecosystem

Cloudflare is not merely a CDN but a comprehensive application platform.

#### Cloudflare Pages

Hosts the frontend assets. Offers direct integration with GitHub—every `git push` triggers an automatic build and deployment. This simplifies the development lifecycle ("DevOps") for the non-profit's team.

#### Cloudflare Workers

Through the `@sveltejs/adapter-cloudflare`, SvelteKit's backend endpoints are deployed as Cloudflare Workers. These serverless functions run on the V8 engine across Cloudflare's global network with near-zero cold start time—far superior to traditional serverless functions (like AWS Lambda)—ensuring that donation forms and volunteer submissions process instantly.

#### Native Security

Provides the "native safety" features requested:

- Unmetered DDoS protection
- Web Application Firewall (WAF)
- Automatic SSL/TLS encryption

This is vital for a site handling payments and volunteer data.

### 3.3 Programming Paradigm: TypeScript and Object-Oriented Design

To meet the requirement for "good software engineering skills" and "Object-Oriented Programming" (OOP), the codebase will be authored entirely in **TypeScript**.

While Svelte is inherently reactive and functional, the business logic managing the non-profit's entities will be modeled using OOP principles. This separation of concerns ensures that the core logic is testable, reusable, and robust.

We will define strict **Interfaces and Classes** for the domain entities:

- A `Horse` class encapsulating the logic for displaying a horse's status or calculating its age from a birthdate
- A `Donation` class handling the logic for calculating tier benefits

This approach brings the rigor of enterprise software development to the web frontend, preventing the "spaghetti code" often seen in smaller web projects.

### Technical Stack Selection Matrix

| Component      | Selection                      | Justification                                                                       |
| -------------- | ------------------------------ | ----------------------------------------------------------------------------------- |
| Meta-Framework | SvelteKit                      | Compiler-based efficiency, native form actions, excellent TypeScript support        |
| Language       | TypeScript                     | Type safety, OOP support, prevents runtime errors, improves developer tooling       |
| Deployment     | Cloudflare Pages               | Global edge network, instant cache invalidation, git integration, zero-config SSL   |
| Backend Logic  | Cloudflare Workers             | Ultra-low latency, serverless cost structure, native SvelteKit integration          |
| Database/Store | JSON / KV                      | Static content stored in JSON (git-backed); Session data in Cloudflare KV if needed |
| Styling        | Tailwind CSS                   | Utility-first, tree-shakable (small size), rapid development of theming             |
| Payments       | Givebutter / Donorbox / Stripe | Nonprofit-friendly options where donors cover fees (see Section 7)                  |
| Email          | Cloudflare Email Routing       | Free, native to Cloudflare, no third-party accounts needed (see Section 6.3)        |

---

## 4. User Experience (UX) and Design System: "Cream and Black"

The visual language of the website is the primary driver of the user's emotional experience. The request for a "Cream and Black" palette is strategically sophisticated. In the non-profit sector, specifically animal rescue, many sites suffer from chaotic color schemes or visual clutter. A minimalist, high-contrast palette signals stability, professionalism, and institutional maturity—qualities that attract high-net-worth donors and corporate sponsors.

### 4.1 Color Theory and Psychology

The design will utilize a deep, rich black (Obsidian) as the primary backdrop for immersive content, creating a "cinematic" environment where photographs and videos of the horses appear to glow. This is contrasted with a soft, warm cream for text-heavy sections to reduce eye strain and evoke the feeling of high-quality stationery.

| Color                      | Hex Code  | Usage                                                        |
| -------------------------- | --------- | ------------------------------------------------------------ |
| **Obsidian** (Primary BG)  | `#050505` | Hero section, photo galleries, footer                        |
| **Rich Cream** (Secondary) | `#F5F5DC` | "About" narrative, "Volunteer" requirements, warmth          |
| **Muted Gold** (Accent)    | `#C5A059` | "Donate" and "Volunteer" buttons, implies value and prestige |
| **Slate Gray** (Metadata)  | `#888888` | Secondary text like dates, photo credits, hierarchy          |

### 4.2 The "Hero" Experience: Visualizing Freedom

The explicit request for a "clip like horses running" on the landing page is a critical UX element. The sight of horses galloping freely triggers a visceral emotional response, validating the donor's desire to see these animals happy and healthy.

**Technical Implementation:**

- Use a `<video>` element set to `muted`, `loop`, and `playsinline`
- Compress video into modern formats (WebM for Chrome/Firefox, MP4 for Safari) to minimize file size

**Poster Image Strategy:**
A high-quality still image loads instantly (`fetchpriority="high"`), serving as a placeholder while the video lazily loads in the background. This ensures the Largest Contentful Paint (LCP) metric remains fast, satisfying Google's Core Web Vitals while delivering the requested visual impact.

### 4.3 Scrollytelling and Interaction Design

To meet the requirement for a "really interactive" and "beautiful user experience" as one scrolls, we will implement "Scrollytelling" mechanics.

#### Parallax Effects

Create depth by having the background (horses in a field) move slightly slower than the foreground text. This subtle differential creates a 3D effect that immerses the user.

#### Scroll-Triggered Animations

Svelte's native `transition` and `motion` libraries will fade in text blocks or slide in images as they enter the viewport. We will use `IntersectionObserver` to trigger these states efficiently without heavy external libraries.

#### Micro-interactions

- Buttons with subtle hover states (scale, shadow bloom)
- Navigation bar dynamically changes transparency as user scrolls from dark Hero section into cream content sections

---

## 5. Software Engineering: Frontend Implementation

The frontend engineering emphasizes modularity, type safety, and "good software engineering skills." We will use SvelteKit's file-based routing and load functions to manage data, ensuring a clean separation between the user interface and the data it displays.

### 5.1 Project Structure and Separation of Concerns

The project will follow a strict directory structure to separate concerns. This organization supports the OOP approach by isolating business logic from UI rendering.

```
src/
├── lib/
│   ├── components/       # Reusable UI elements (Button.svelte, HorseCard.svelte)
│   ├── server/           # Server-only logic (StripeClient.ts, EmailService.ts)
│   ├── types/            # TypeScript interfaces (Horse.ts, Volunteer.ts)
│   ├── models/           # OOP Classes (DonationModel.ts, VolunteerModel.ts)
│   └── stores/           # Svelte stores for global state (uiStore.ts)
├── routes/
│   ├── +layout.svelte    # Global layout (Navbar, Footer)
│   ├── +page.svelte      # Homepage
│   ├── donate/
│   │   ├── +page.svelte  # Donation UI
│   │   └── +server.ts    # API endpoint for payment intents
│   └── volunteer/
│       ├── +page.svelte  # Form UI
│       └── +page.server.ts # Form action handler
└── app.d.ts              # Global type declarations (Cloudflare Platform)
```

### 5.2 Object-Oriented Domain Modeling

While Svelte components are functional, we will encapsulate the complexity of the non-profit's data in TypeScript classes. This allows us to unit test the logic independently of the UI.

#### Example: The Horse Entity

We will define a `Horse` class in `src/lib/models/Horse.ts`. This class will handle the logic for data presentation, such as formatting the horse's age or determining the correct CSS class for its adoption status.

```typescript
// src/lib/types.ts
export type HorseStatus = 'Available' | 'Sanctuary' | 'Adopted';

export interface IHorseData {
	id: string;
	name: string;
	breed: string;
	birthYear: number;
	status: HorseStatus;
	bio: string;
	image: string;
}

// src/lib/models/Horse.ts
import type { IHorseData } from '../types';

export class Horse {
	constructor(private data: IHorseData) {}

	get name(): string {
		return this.data.name;
	}

	get age(): number {
		const currentYear = new Date().getFullYear();
		return currentYear - this.data.birthYear;
	}

	get isAdoptable(): boolean {
		return this.data.status === 'Available';
	}

	get badgeColor(): string {
		switch (this.data.status) {
			case 'Available':
				return 'bg-green-500';
			case 'Sanctuary':
				return 'bg-gold-500'; // The Muted Gold
			case 'Adopted':
				return 'bg-gray-500';
			default:
				return 'bg-black';
		}
	}
}
```

By using this class in our Svelte components (e.g., `<HorseCard horse={horseInstance} />`), we ensure that if the logic for calculating age or badge color changes, it is updated in one central location, adhering to the **DRY (Don't Repeat Yourself)** principle.

### 5.3 Type-Safe Data Management

We will use TypeScript interfaces to define the shape of all external data. This includes the API responses from Stripe and the configuration for the volunteer form.

In `app.d.ts`, we will extend the `App.Platform` interface to include the specific Cloudflare bindings we need, ensuring that `platform.env.STRIPE_SECRET_KEY` is typed and autocompleted in the IDE, reducing the risk of typo-induced runtime errors.

---

## 6. Detailed Feature Specification: Volunteer System

The volunteer system is a critical operational pipeline. The current system is manual and likely prone to data loss or delay. The new system will use SvelteKit Form Actions and Cloudflare Workers to create a robust, automated intake process.

### 6.1 Requirement Analysis

The Deep Research indicates that the volunteer form must collect:

| Field Category | Data Points                                                         |
| -------------- | ------------------------------------------------------------------- |
| Personal Info  | First Name, Last Name, Email, Phone                                 |
| Bio            | "A few words about you"                                             |
| Source         | "How did you find out about us?"                                    |
| Availability   | Matrix of shifts: Mon AM (9-12), Mon PM (3-5), Thu AM, Fri AM, etc. |
| Orientation    | Selection of a specific date                                        |

### 6.2 Technical Implementation

We will build a **"Progressive Enhancement"** form. This means the form works as a standard HTML form (POST request) even if JavaScript fails, but upgrades to a smooth client-side experience when JS is active.

#### Validation Strategy

We will use **Zod**, a TypeScript-first schema validation library. Zod allows us to define the "shape" of a valid volunteer application.

```typescript
// src/lib/schemas.ts
import { z } from 'zod';

export const volunteerSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	email: z.string().email('Invalid email address'),
	phone: z.string().min(10, 'Phone number is too short'),
	bio: z.string().max(500, 'Bio is too long'),
	availability: z
		.array(z.enum(['mon_am', 'mon_pm', 'thu_am', 'fri_am', 'sat_am', 'sun_am']))
		.nonempty('Please select at least one shift'),
	orientationDate: z.string().date(),
	referralSource: z.string()
});
```

#### The Server Action

In `src/routes/volunteer/+page.server.ts`, the default action will handle the submission:

1. **Parse:** Extract data from `request.formData()`
2. **Validate:** Run `volunteerSchema.safeParse(data)`. If it fails, return the specific error messages to the frontend to display inline (e.g., highlighting the "Email" field in red)
3. **Process:** If valid, the Cloudflare Worker will trigger the email service

### 6.3 Email Integration: Cloudflare Email Routing (FREE)

Cloudflare provides **native email sending** built into Workers—no third-party service required. This is the simplest and most cost-effective solution for nonprofit volunteer notifications.

#### How It Works

1. **Enable Email Routing** on the Cloudflare domain (free feature)
2. **Verify destination email** (e.g., `volunteers@thehorseprojectsantabarbara.com`)
3. **Add `send_email` binding** to the Worker configuration
4. **Worker sends email** directly to staff inbox when form is submitted

#### Configuration (wrangler.toml)

```toml
[[send_email]]
binding = "EMAIL"
destination_address = "volunteers@thehorseprojectsantabarbara.com"
```

#### Worker Code Example

```typescript
// In +page.server.ts form action
await platform.env.EMAIL.send({
	from: 'website@thehorseprojectsantabarbara.com',
	to: 'volunteers@thehorseprojectsantabarbara.com',
	subject: `New Volunteer Interest: ${firstName} ${lastName}`,
	text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nAvailability: ${availability.join(', ')}`
});
```

#### Benefits

| Benefit                     | Description                                 |
| --------------------------- | ------------------------------------------- |
| **Free**                    | Included with Cloudflare—no additional cost |
| **No Third-Party Accounts** | No Resend, SendGrid, Mailgun, etc.          |
| **Simple Integration**      | Just a few lines of code                    |
| **Reliable**                | Cloudflare's global infrastructure          |

#### Limitations

- Can only send to **verified email addresses** (your own team inbox)
- Not suitable for sending confirmation emails back to volunteers
- 25 MiB message size limit

**User Feedback:**

- Upon success, redirect to a "Thank You" page with next steps
- Display a message like: "Thank you for your interest! We'll be in touch within 48 hours."

> **Note:** If confirmation emails to volunteers are required in the future, consider Brevo (300 emails/day free) or MailChannels.

---

## 7. Detailed Feature Specification: Donation System

The donation flow is the financial lifeline. The user requested features like custom amounts, Apple/Google Pay, and tax receipts.

### 7.1 Payment Platform Options for Nonprofits

For a 501(c)(3) organization, several platforms offer advantages over traditional payment processors:

| Platform               | Processing Fee | Nonprofit Advantage                       | Best For                     |
| ---------------------- | -------------- | ----------------------------------------- | ---------------------------- |
| **Givebutter**         | 2.9% + $0.30   | No platform fee; 95% of donors cover fees | Recommended—effectively free |
| **Donorbox**           | 1.75% platform | Free tier; donors can cover fees          | Budget-conscious nonprofits  |
| **PayPal Giving Fund** | 1.99% + fixed  | Discounted rate for 501(c)(3)             | Familiar brand for donors    |
| **Stripe**             | 2.2% + $0.30   | Nonprofit discount; best developer API    | Custom integrations          |

> **Recommendation:** Givebutter or Donorbox are ideal for nonprofits because they allow donors to optionally cover processing fees, making the transaction effectively free for the organization. Stripe is best if custom technical integration is required.

### 7.2 Smart Donation Widget Design

Regardless of payment platform, the widget will be a prominent UI element on the "Donate" page.

| Feature          | Description                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| Frequency Toggle | A switch for "One-Time" vs. "Monthly" (The Circle)                                                         |
| Amount Grid      | Buttons for specific amounts: $25, $50, $100, $250                                                         |
| Custom Input     | A field allowing users to type "$1" or "$123"                                                              |
| Impact Context   | Dynamic text updates as user selects amount (e.g., "$20 Monthly" → "Covers hay for one horse for a month") |
| Fee Coverage     | Optional checkbox: "Cover processing fees so 100% goes to the horses"                                      |

### 7.3 Integration Approaches

#### Option A: Embedded Widget (Givebutter/Donorbox)

Both Givebutter and Donorbox offer embeddable widgets that can be placed directly on the donate page:

```html
<!-- Givebutter Example -->
<script src="https://widgets.givebutter.com/latest.umd.cjs?acct=ORG_ID&p=donate"></script>
<givebutter-widget id="donate"></givebutter-widget>
```

This approach requires minimal code and handles all payment logic, compliance, and receipts automatically.

#### Option B: Custom Stripe Integration

For maximum control, use Stripe's Payment Element with `svelte-stripe`:

1. Frontend sends the selected amount to the backend `POST /api/payment-intent`
2. Backend (Cloudflare Worker) initializes the Stripe SDK, creates a PaymentIntent, returns the `client_secret`
3. Frontend uses `client_secret` to mount the Payment Element
4. Payment Element auto-detects Apple Pay/Google Pay on supported devices

### 7.4 Automated Tax Receipts & Compliance

**For Givebutter/Donorbox:**

- Tax receipts are sent automatically with proper 501(c)(3) language
- No additional configuration required

**For Stripe:**

- Configure the Dashboard to send emails upon successful payment
- Add logo and legal text in Branding settings:

> "The Horse Project is a 501(c)(3) non-profit organization operating under the fiscal sponsorship of the Players Philanthropy Fund. No goods or services were provided in exchange for this contribution."

---

## 8. Search Engine Optimization (SEO) & Security

### 8.1 JSON-LD Structured Data

To ensure the site ranks well and appears rich in Google, we will inject **JSON-LD** (JavaScript Object Notation for Linked Data) into the `<head>` of the layout. This speaks directly to search engines in their native language.

**Organization Schema:** On the homepage, define the non-profit status, logo, and area served.

**AnimalShelter Schema:** Use the specific `schema.org` type `AnimalShelter` (or NGO). This allows Google to understand the physical location and opening hours.

#### Code Implementation

```html
<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "AnimalShelter",
		"name": "The Horse Project Santa Barbara",
		"legalName": "The Horse Project",
		"url": "https://www.thehorseprojectsantabarbara.com",
		"logo": "https://www.thehorseprojectsantabarbara.com/logo.png",
		"description": "Rehabilitating rescued horses and providing therapeutic programs for veterans and the community.",
		"openingHours": "Fr,Sa,Su 09:30-12:00",
		"address": {
			"@type": "PostalAddress",
			"addressLocality": "Santa Barbara",
			"addressRegion": "CA",
			"addressCountry": "US"
		}
	}
</script>
```

This ensures that when someone searches "Horse rescue Santa Barbara," the site appears with rich details like hours and directions.

### 8.2 Security Infrastructure

#### Cloudflare Turnstile

Prevents bot spam on the Volunteer and Contact forms—a common issue for public forms. This is a smart, invisible CAPTCHA alternative that verifies the user is human without forcing them to click traffic lights. It integrates cleanly with SvelteKit form actions validation logic.

#### Content Security Policy (CSP)

Define strict headers that only allow scripts from our domain, Stripe, and Cloudflare to execute. This mitigates Cross-Site Scripting (XSS) attacks.

---

## 9. Content Strategy and Page-by-Page Migration Plan

This section outlines the specific content requirements for each page, ensuring all "replicated" content finds a home in the modern structure.

### 9.1 Home (`/`)

| Section         | Content                                                                         |
| --------------- | ------------------------------------------------------------------------------- |
| Hero            | Video of running horses, Mission Statement, Primary CTA (Donate), Secondary CTA |
| Impact Stats    | Dynamic counter for "Years of Rescue," "Horses Saved"                           |
| Featured Horses | Horizontal scroll of "Available" horses (Anjo, Jalisco) to drive traffic        |

### 9.2 About (`/about`)

- **Narrative:** The history of the organization
- **Fiscal Sponsorship:** Explicit mention of the Players Philanthropy Fund partnership to build trust
- **The Sanctuary:** Description of the "Sanctuary" concept—horses that stay forever

### 9.3 The Horses (`/horses`)

- **Unified Inventory:** A filtered grid view. Users can toggle between "Available for Adoption" and "Sanctuary Residents"
- **Cards:** Each card features a high-res photo, Name, Breed, and a badge (e.g., "Adopted," "Available")
- **Migration:** Ensure all names are migrated:
  - Ms. Jackie Blue, Anjo, Jalisco, Greyson, Savannah, Diego, Ruby
  - Note status changes (Ms. Jackie Blue = Adopted)

### 9.4 Programs (`/programs`)

- **Better With Horses:** Detailed breakdown of the 10-week courses and veteran programs. Embed the "Women Veterans" video and the "Blind Fitness" news clip
- **Play With Rescued:** Clear schedule (Fri-Sun, 9:30-12), Pricing ($65), and a direct link to a booking form or email inquiry

### 9.5 Get Involved (`/join`)

- **Volunteer:** The complex form described in Section 6
- **Events:** A calendar view of upcoming Orientations

### 9.6 Donate (`/donate`)

- **The Widget:** The smart Stripe widget described in Section 7
- **The Circle:** A dedicated section explaining the "Sanctuary Horse's Circle" tiers ($10-$700) and benefits:
  - $10 = Birthday Party invite
  - $700 = Interactive Play Time

---

## 10. Conclusion and Implementation Roadmap

This report defines a comprehensive strategy to transform The Horse Project Santa Barbara into a digital leader in the non-profit space. By combining the aesthetic elegance of the "Cream and Black" design system with the raw performance of the SvelteKit + Cloudflare stack, the new platform will be visually stunning, operationally robust, and financially efficient.

### Implementation Phases

| Phase   | Focus                                                                                    |
| ------- | ---------------------------------------------------------------------------------------- |
| Phase 1 | **Setup:** Initialize SvelteKit, configure Cloudflare Pages, setup TypeScript interfaces |
| Phase 2 | **Design:** Implement Tailwind theme, build Layout (Nav/Footer), engineer Hero Video     |
| Phase 3 | **Core Content:** Migrate text and images, build Horse Class logic and Inventory Grid    |
| Phase 4 | **Features:** Build Volunteer Form (Zod + Resend) and Donation Widget (Stripe)           |
| Phase 5 | **Launch:** DNS switch, SEO verification, final UAT of payment flows                     |

---

The result will be a platform that not only "replicates" the existing content but elevates it, creating a powerful engine for empathy, engagement, and support.
