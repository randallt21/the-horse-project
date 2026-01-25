# The Horse Project Santa Barbara

> 🐴 People helping horses and horses helping people.

A nonprofit website for The Horse Project Santa Barbara, a 501(c)(3) organization dedicated to rescuing horses and providing therapeutic programs.

## Tech Stack

- **SvelteKit** (Svelte 5)
- **Cloudflare Pages** deployment
- **Tailwind CSS v4** with "Cream and Black" theme
- **TypeScript**
- **oxlint** for linting

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
src/
├── lib/
│   ├── components/    # Reusable UI components
│   ├── models/        # Domain models (Horse)
│   ├── data/          # JSON data (horses)
│   ├── types.ts       # TypeScript interfaces
│   └── schemas.ts     # Zod validation schemas
├── routes/
│   ├── +page.svelte       # Homepage
│   ├── about/             # About page
│   ├── horses/            # Horse gallery with filters
│   ├── programs/          # Programs page
│   ├── join/              # Volunteer form
│   └── donate/            # Donation page (UI only)
└── routes/layout.css      # Global styles + theme
```

## Deployment

This project is configured for Cloudflare Pages:

```bash
npm run build
# Deploy .svelte-kit/cloudflare/ to Cloudflare Pages
```

Or connect your GitHub repo to Cloudflare Pages for automatic deployments.

## Future Work

- **Payment Integration**: See [docs/future/donation-integration.md](docs/future/donation-integration.md)
- **Email Integration**: Cloudflare Email Routing
- **Bot Protection**: Cloudflare Turnstile

## License

© The Horse Project Santa Barbara. All rights reserved.
