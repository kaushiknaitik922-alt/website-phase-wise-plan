import { NextResponse } from "next/server";
import { z } from "zod";
import { saveEnquiry } from "@/lib/data/enquiries";
import { sendEnquiryNotification } from "@/lib/resend";

/**
 * Enquiry form submit handler (PRD.md §6): validate → save to the
 * `enquiries` collection (Neon Postgres via Payload in the real build; a
 * local JSON store here, see lib/data/enquiries.ts) → notify the owner via
 * Resend. The DB write is the source of truth: a failed email never blocks
 * or rolls back a successful save.
 */

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Naam kam se kam 2 letters ka hona chahiye."),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Sahi 10-digit phone number daalein."),
  occasion: z.enum(
    ["Birthday", "Wedding", "Haldi", "Room Decoration", "Car Decoration", "Other"],
    { message: "Occasion chunein." }
  ),
  eventDate: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request." },
      { status: 400 }
    );
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Form mein kuch galat hai.";
    return NextResponse.json({ ok: false, message: firstError }, { status: 400 });
  }

  try {
    const record = await saveEnquiry(parsed.data);
    // Fire-and-forget: an email failure must never fail the enquiry itself.
    void sendEnquiryNotification(record);

    return NextResponse.json({
      ok: true,
      message: "Dhanyawad! Hum jald hi aapse sampark karenge.",
    });
  } catch (err) {
    console.error("[api/enquiry] Failed to save enquiry:", err);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Kuch galat ho gaya. Kripya WhatsApp ya call karke sampark karein.",
      },
      { status: 500 }
    );
  }
}
