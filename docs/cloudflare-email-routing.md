# Cloudflare Email Routing Setup Guide

This document describes how to set up email notifications for volunteer form submissions using Cloudflare Email Routing.

## Overview

When a visitor submits the volunteer sign-up form at `/join`, the application sends an email notification to staff. This uses Cloudflare Email Routing's `send_email` Worker binding — no external email service required.

---

## Prerequisites

Before the code works, you must configure Email Routing in Cloudflare Dashboard:

### Step 1: Enable Email Routing

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your domain (e.g., `thehorseprojectsantabarbara.com`)
3. Navigate to **Email > Email Routing**
4. Click **Add records and enable** to add MX records
5. Wait for DNS propagation

> ⚠️ **Important**: Enabling Email Routing will replace any existing MX records. If you have an existing email provider (Gmail, Outlook, etc.), you may need to reconfigure.

### Step 2: Add Destination Address

1. In **Email > Email Routing > Destination addresses**
2. Click **Add destination**
3. Enter the email where notifications should go (e.g., `volunteers@yourpersonalemail.com`)
4. Click **Save** — Cloudflare sends a verification email
5. Open the verification email and click **Verify email address**
6. The status should show **Verified**

### Step 3: Create Custom Address (Optional)

If you want emails to appear as coming from your domain:

1. In **Email > Email Routing > Routes**
2. Click **Create address**
3. Enter `website` (to create `website@yourdomain.com`)
4. Select your verified destination address
5. Click **Save**

---

## Technical Implementation

### wrangler.toml Configuration

Create `wrangler.toml` in the project root:

```toml
name = "the-horse-project"
compatibility_date = "2024-01-01"

# Email Routing binding
[[send_email]]
name = "EMAIL"
destination_address = "YOUR_VERIFIED_EMAIL@example.com"
```

Replace `YOUR_VERIFIED_EMAIL@example.com` with your verified destination address.

### TypeScript Types (app.d.ts)

The `platform.env.EMAIL` binding needs proper types:

```typescript
interface SendEmail {
  send(message: EmailMessage): Promise<void>;
}

interface Platform {
  env: {
    EMAIL?: SendEmail;
  };
  context: {
    waitUntil(promise: Promise<unknown>): void;
  };
}
```

### Sending Emails from SvelteKit

Use the `mimetext` library to construct RFC 5322 compliant emails:

```typescript
import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

// In +page.server.ts
export const actions = {
  default: async ({ request, platform }) => {
    const data = await request.formData();

    // Build MIME message
    const msg = createMimeMessage();
    msg.setSender({ name: "Website", addr: "website@yourdomain.com" });
    msg.setRecipient("destination@example.com");
    msg.setSubject("New Volunteer Application");
    msg.addMessage({
      contentType: "text/plain",
      data: `Name: ${data.get("firstName")} ${data.get("lastName")}\nEmail: ${data.get("email")}`,
    });

    // Send via Cloudflare binding
    if (platform?.env?.EMAIL) {
      const message = new EmailMessage(
        "website@yourdomain.com",
        "destination@example.com",
        msg.asRaw(),
      );
      await platform.env.EMAIL.send(message);
    }

    return { success: true };
  },
};
```

---

## Local Development

Email sending **only works in production** (deployed to Cloudflare). During local development:

- The `platform.env.EMAIL` binding will be `undefined`
- The code gracefully skips email sending
- Form submission still works and shows success state

To test email functionality, you must deploy to Cloudflare Pages.

---

## Deployment Checklist

- [ ] Enable Email Routing in Cloudflare Dashboard
- [ ] Add and verify destination email address
- [ ] Create `wrangler.toml` with correct destination address
- [ ] Deploy to Cloudflare Pages
- [ ] Test volunteer form submission
- [ ] Confirm email arrives at destination inbox

---

## References

- [Cloudflare Email Routing Docs](https://developers.cloudflare.com/email-routing/)
- [Send emails from Workers](https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/)
- [SvelteKit Cloudflare Adapter](https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/)
- [mimetext Library](https://www.npmjs.com/package/mimetext)
