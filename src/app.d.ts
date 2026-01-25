// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

// Cloudflare Pages platform types
// Reference: https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/

// Cloudflare Email Routing types
// Reference: https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/
interface EmailMessage {
	readonly from: string;
	readonly to: string;
	readonly raw: Uint8Array | string;
}

interface SendEmail {
	send(message: EmailMessage): Promise<void>;
}

// EmailMessage constructor for creating messages
declare class EmailMessageClass {
	constructor(from: string, to: string, raw: Uint8Array | string);
	readonly from: string;
	readonly to: string;
	readonly raw: Uint8Array | string;
}

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}

		interface Platform {
			env?: {
				// Cloudflare Email Routing binding
				EMAIL?: SendEmail;
			};
			context?: {
				waitUntil(promise: Promise<unknown>): void;
			};
			caches?: CacheStorage;
		}
	}
}

declare module 'cloudflare:email' {
	export class EmailMessage {
		constructor(from: string, to: string, raw: Uint8Array | string);
	}
}

export {};

