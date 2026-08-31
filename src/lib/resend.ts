import type { StoredEnquiry } from "@/lib/data/enquiries";

/**
 * Owner-notification email via Resend, per WEBSITE_ARCHITECTURE.md
 * (`lib/resend.ts — Resend client + owner-notification email template`).
 *
 * Deliberately called *after* the enquiry is already saved (see
 * `app/api/enquiry/route.ts`) so an email failure never blocks the enquiry
 * from being recorded — the owner can always see it in `/admin` regardless.
 *
 * No `RESEND_API_KEY` is configured in this environment, so this quietly
 * no-ops and logs instead of throwing — wire a real key in `.env` to enable
 * it, no code change required.
 */
export async function sendEnquiryNotification(
  enquiry: StoredEnquiry
): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL;

  if (!apiKey || !ownerEmail) {
    console.info(
      "[resend] Skipping email notification — RESEND_API_KEY/OWNER_NOTIFICATION_EMAIL not set. New enquiry:",
      enquiry
    );
    return { sent: false, reason: "not_configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Saini Phool Bhandar <onboarding@resend.dev>",
        to: [ownerEmail],
        subject: `Nayi Enquiry — ${enquiry.name} (${enquiry.occasion})`,
        html: `
          <div style="font-family: sans-serif; color: #33302E;">
            <h2 style="color:#D6789A;">Nayi Enquiry Aayi Hai</h2>
            <p><strong>Naam:</strong> ${enquiry.name}</p>
            <p><strong>Phone:</strong> ${enquiry.phone}</p>
            <p><strong>Occasion:</strong> ${enquiry.occasion}</p>
            ${enquiry.eventDate ? `<p><strong>Event Date:</strong> ${enquiry.eventDate}</p>` : ""}
            ${enquiry.message ? `<p><strong>Message:</strong> ${enquiry.message}</p>` : ""}
            <p style="color:#6B615C; font-size: 13px;">Saini Phool Bhandar website enquiry form se aayi hai.</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[resend] Failed to send notification email:", text);
      return { sent: false, reason: "api_error" };
    }

    return { sent: true };
  } catch (err) {
    console.error("[resend] Error sending notification email:", err);
    return { sent: false, reason: "network_error" };
  }
}
