import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { bookingSchema } from '$lib/schemas';

export const actions: Actions = {
	default: async ({ request, platform }) => {
		const formData = await request.formData();

		// Extract form fields
		const data = {
			name: formData.get('name') as string,
			email: formData.get('email') as string,
			phone: formData.get('phone') as string,
			date: formData.get('date') as string,
			guests: parseInt(formData.get('guests') as string) || 1,
			totalAmount: parseFloat(formData.get('totalAmount') as string) || 0
		};

		// Server-side validation using Zod schema
		const result = bookingSchema.safeParse(data);
		if (!result.success) {
			const errors: Record<string, string> = {};
			result.error.issues.forEach((issue) => {
				const field = issue.path[0] as string;
				errors[field] = issue.message;
			});
			return fail(400, { errors, data });
		}
		
		// Additional server-side date validation
		const dateObj = new Date(data.date);
		const day = dateObj.getUTCDay(); // 0=Sun, 5=Fri, 6=Sat
		if (day !== 0 && day !== 5 && day !== 6) {
			return fail(400, { 
				errors: { date: "Sessions are only available on Friday, Saturday, and Sunday." }, 
				data 
			});
		}

		// --- MOCK PAYMENT PROCESSING START ---
		// In a real app, you would call Stripe/Square API here.
		// For now, we simulate a successful transaction.
		await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
		const transactionId = "MOCK_" + Math.random().toString(36).substring(7).toUpperCase();
		// --- MOCK PAYMENT PROCESSING END ---


		// Construct email content for Admin
		const adminEmailBody = `
New Booking Session
==================

Guest: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Date: ${data.date}
Time: 9:30 AM - 12:00 PM
Guests: ${data.guests}
Total Paid: $${data.totalAmount}
Transaction ID: ${transactionId}

---
This email was automatically sent from the booking system.
`.trim();

		// Construct email content for User (Receipt)
		const userEmailBody = `
Booking Confirmation - The Horse Project Santa Barbara
======================================================

Dear ${data.name},

Thank you for booking your "Play With Rescued Horses" session! We are excited to welcome you to the sanctuary.

Here are your booking details:
Date: ${data.date}
Time: 9:30 AM - 12:00 PM
Guests: ${data.guests}
Total Paid: $${data.totalAmount}
Booking Ref: ${transactionId}

Address:
[Sanctuary Address Placeholder]
Santa Barbara, CA

What to bring:
- Closed-toe shoes (mandatory)
- Water bottle
- Sunscreen/Hat
- Curiosity and an open heart!

If you need to reschedule, please just reply to this email. We understand that plans change and we're happy to find another time that works for you!

See you soon!

The Horse Project Team
thehorseprojectsantabarbara.com
`.trim();

		// Send emails via Cloudflare Email Routing
		const { sendEmail } = await import('$lib/server/email');

		// 1. Send Admin Notification
		await sendEmail(platform, {
			to: 'thehorseprojectsb@gmail.com',
			subject: `New Booking: ${data.name} - ${data.date}`,
			text: adminEmailBody
		});

		// 2. Send User Confirmation
		await sendEmail(platform, {
			to: data.email,
			subject: `Booking Confirmation: ${data.date}`,
			text: userEmailBody
		});

		return { success: true };
	}
};
