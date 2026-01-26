/**
 * Shared email utility for sending emails via Cloudflare Email Routing
 */

export interface EmailOptions {
	to: string;
	subject: string;
	text: string;
	fromName?: string;
	fromEmail?: string;
}

export async function sendEmail(
	platform: App.Platform | undefined,
	options: EmailOptions
): Promise<boolean> {
	const {
		to,
		subject,
		text,
		fromName = 'The Horse Project Website',
		fromEmail = 'website@thehorseprojectsantabarbara.com'
	} = options;

	// Check if platform env is available (Production)
	if (platform?.env?.EMAIL) {
		try {
			// Dynamic import to avoid build issues in dev
			// @ts-ignore - module resolution for worker types
			const { createMimeMessage } = await import('mimetext');
			// @ts-ignore - access global EmailMessage constructor from worker environment
			const { EmailMessage: EmailMessageCtor } = globalThis as unknown as {
				EmailMessage: new (
					from: string,
					to: string,
					raw: string
				) => { from: string; to: string; raw: string };
			};

			const msg = createMimeMessage();
			msg.setSender({
				name: fromName,
				addr: fromEmail
			});
			msg.setRecipient(to);
			msg.setSubject(subject);
			msg.addMessage({
				contentType: 'text/plain',
				data: text
			});

			const message = new EmailMessageCtor(fromEmail, to, msg.asRaw());

			await platform.env.EMAIL.send(message);
			return true;
		} catch (error) {
			console.error('Failed to send email notification:', error);
			return false;
		}
	} else {
		// Local development - log only
		console.log('[DEV] Would send email:', {
			from: `${fromName} <${fromEmail}>`,
			to,
			subject,
			body: text
		});
		return true;
	}
}
