// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

// Cloudflare Pages platform types
// Reference: https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}

    interface Platform {
      env?: {
        // Future: Email Routing binding
        // EMAIL?: SendEmail;
        // Future: Payment integration
        // STRIPE_SECRET_KEY?: string;
      };
      context?: {
        waitUntil(promise: Promise<unknown>): void;
      };
      caches?: CacheStorage;
    }
  }
}

export {};
