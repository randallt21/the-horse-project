import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { contactSchema } from '$lib/schemas';

export const actions: Actions = {
	default: async ({ request, platform }) => {
		const formData = await request.formData();

		// Extract form fields
		const data = {
			name: formData.get('name') as string,
			email: formData.get('email') as string,
			phone: (formData.get('phone') as string) || undefined,
			subject: formData.get('subject') as string,
			message: formData.get('message') as string
		};

		// Server-side validation using Zod schema
		const result = contactSchema.safeParse(data);
		if (!result.success) {
			const errors: Record<string, string> = {};
			result.error.issues.forEach((issue) => {
				const field = issue.path[0] as string;
				errors[field] = issue.message;
			});
			return fail(400, { errors, data });
		}

		// Construct email content
		const emailBody = `
New Contact Form Submission
==========================

Subject: ${data.subject}

From:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || '(Not provided)'}

Message:
--------------------------
${data.message}
--------------------------

---
This email was automatically sent from the website contact form.
`.trim();

		// Send email notification via Cloudflare Email Routing
		const { sendEmail } = await import('$lib/server/email'); // Dynamic import to handle server-only module

		await sendEmail(platform, {
			to: 'thehorseprojectsb@gmail.com',
			subject: `Contact: ${data.subject} - ${data.name}`,
			text: emailBody
		});

		return { success: true };
	}
};
