import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { volunteerSchema } from '$lib/schemas';

// Shift ID to human-readable label mapping
const shiftLabels: Record<string, string> = {
	mon_am: 'Monday AM (8:00-12:00)',
	mon_pm: 'Monday PM (1:00-5:00)',
	thu_am: 'Thursday AM (8:00-12:00)',
	fri_am: 'Friday AM (8:00-12:00)',
	sat_am: 'Saturday AM (8:00-12:00)',
	sun_am: 'Sunday AM (8:00-12:00)'
};

function formatAvailability(shifts: string[]): string {
	return shifts.map((s) => shiftLabels[s] || s).join('\n  • ');
}

export const actions: Actions = {
	default: async ({ request, platform }) => {
		const formData = await request.formData();

		// Extract form fields
		const data = {
			firstName: formData.get('firstName') as string,
			lastName: formData.get('lastName') as string,
			email: formData.get('email') as string,
			phone: formData.get('phone') as string,
			bio: (formData.get('bio') as string) || undefined,
			availability: formData.getAll('availability') as string[],
			orientationDate: (formData.get('orientationDate') as string) || undefined,
			referralSource: (formData.get('referralSource') as string) || undefined
		};

		// Server-side validation using Zod schema
		const result = volunteerSchema.safeParse(data);
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
New Volunteer Application Received
===================================

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}

About Them:
${data.bio || '(Not provided)'}

Availability:
  • ${formatAvailability(data.availability)}

How They Found Us: ${data.referralSource || '(Not provided)'}

---
This email was automatically sent from the website volunteer form.
`.trim();

		// Send email notification via Cloudflare Email Routing
		const { sendEmail } = await import('$lib/server/email');

		await sendEmail(platform, {
			to: 'volunteers@thehorseprojectsantabarbara.com', // Keeping the specific destination for volunteers
			subject: `New Volunteer Application: ${data.firstName} ${data.lastName}`,
			text: emailBody
		});

		return { success: true };
	}
};
