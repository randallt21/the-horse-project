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

## Configuring the Binding (CRITICAL)

**Note:** For Cloudflare **Pages** projects, the `[[send_email]]` binding configuration in `wrangler.toml` is **not supported**. You must configure this manually in the Cloudflare Dashboard.

### Step 1: Configure Binding in Dashboard

1.  Deploy your project to Cloudflare Pages first (it will build, but email features won't work yet).
2.  Go to **Cloudflare Dashboard > Pages > [Your Project]**.
3.  Click **Settings** -> **Functions**.
4.  Scroll down to the **Email Routing** section.
5.  Click **Add Binding**.
6.  Configure the binding:
    - **Name**: `EMAIL` (Must match the code exactly)
    - **Destination Address**: `volunteers@thehorseprojectsantabarbara.com` (or your desired verified destination)
7.  Click **Save**.
8.  **Re-deploy**: You may need to trigger a new deployment (e.g., push a small commit) for the binding to take effect.

---

## DNS Configuration (If using a new domain)

If you haven't set up the domain `thehorseprojectsantabarbara.com` yet, you need to configure the DNS records provided by Cloudflare Email Routing.

1.  Go to **Email > Email Routing > Settings**.
2.  Click **enable**. Cloudflare will provide a list of DNS records (MX and TXT).
3.  Add these records to your DNS provider (if you are managing DNS outside of Cloudflare):
    - **MX Records**: Ensure they point to Cloudflare's mail servers.
    - **TXT (SPF) Record**: Ensure it includes `include:_spf.mx.cloudflare.net` to allow Cloudflare to send emails on your behalf.

---

## Technical Implementation

### wrangler.toml

Your `wrangler.toml` should look like this (clean, without bindings):

```toml
name = "the-horse-project"
compatibility_date = "2026-01-26"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".svelte-kit/cloudflare"
```

### TypeScript Types (app.d.ts)

The `platform.env.EMAIL` binding needs proper types:

```typescript
interface SendEmail {
  send(message: EmailMessage): Promise<void>;
}

interface Platform {
  env?: {
    EMAIL?: SendEmail;
  };
  context: {
    waitUntil(promise: Promise<unknown>): void;
  };
}
```

### Sending Emails from SvelteKit

Use the `mimetext` library to construct RFC 5322 compliant emails. The backend logic remains the same.

```typescript
import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

// In +page.server.ts
export const actions = {
  default: async ({ request, platform }) => {
    const data = await request.formData();

    // Check if binding exists (it won't locally)
    if (!platform?.env?.EMAIL) {
      console.log("Skipping email send (no binding or local dev)");
      return { success: true };
    }

    try {
      const msg = createMimeMessage();
      msg.setSender({ name: "Website", addr: "no-reply@thehorseprojectsantabarbara.com" });
      msg.setRecipient("volunteers@thehorseprojectsantabarbara.com");
      msg.setSubject("New Volunteer Application");
      msg.addMessage({
        contentType: "text/plain",
        data: `Name: ${data.get("firstName")} ${data.get("lastName")}\nEmail: ${data.get("email")}`,
      });

      const message = new EmailMessage(
        "no-reply@thehorseprojectsantabarbara.com",
        "volunteers@thehorseprojectsantabarbara.com",
        msg.asRaw(),
      );

      await platform.env.EMAIL.send(message);
      return { success: true };
    } catch (e) {
      console.error("Email send failed:", e);
      return { success: false, error: "Email failed to send" };
    }
  },
};
```

---

## Local Development

Email sending **only works in production** (deployed to Cloudflare). During local development:

- The `platform.env.EMAIL` binding will be `undefined`.
- The code provided checks for this and skips sending.
- To test the full flow, you must deploy.

---

## Deployment Checklist

- [ ] Enable Email Routing in Cloudflare Dashboard (DNS Setup).
- [ ] Verify destination email address in Email Routing settings.
- [ ] Add `EMAIL` binding in Pages > Settings > Functions > Email Routing.
- [ ] Deploy to Cloudflare Pages.
- [ ] Test volunteer form submission.
- [ ] Confirm email arrives at destination inbox.

---

## References

- [Cloudflare Email Routing Docs](https://developers.cloudflare.com/email-routing/)
- [Send emails from Workers](https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/)
- [SvelteKit Cloudflare Adapter](https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/)
- [mimetext Library](https://www.npmjs.com/package/mimetext)
