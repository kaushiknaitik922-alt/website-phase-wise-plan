import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import type { EnquiryInput } from "@/lib/types";

/**
 * Local stand-in for Payload's `enquiries` collection, backed by Neon
 * Postgres in the real build (WEBSITE_ARCHITECTURE.md §3/§4). Here the
 * enquiry form's server route persists submissions to a JSON file on disk
 * instead, so the full submit → store → confirm loop is genuinely testable
 * without a database connection string. Swapping this module's body for a
 * `payload.create({ collection: 'enquiries', data })` call is the only
 * change needed to move to the real Neon-backed collection later.
 *
 * Storage location is deliberately `os.tmpdir()`, not `process.cwd()`:
 * serverless platforms (Vercel included) ship the deployment as a
 * read-only filesystem — only `/tmp` (what `os.tmpdir()` resolves to) is
 * writable, and even that is ephemeral per instance/cold start. That
 * ephemerality is the same limitation WEBSITE_ARCHITECTURE.md notes for
 * image uploads, which is why that doc specifies Neon Postgres (not disk)
 * for `enquiries` in production — until that migration, the owner
 * notification email (src/lib/resend.ts) is the durable record of a
 * submission, with this file as a same-instance convenience only.
 */

export interface StoredEnquiry extends EnquiryInput {
  id: string;
  status: "New" | "Contacted" | "Closed";
  createdAt: string;
}

const DATA_DIR = path.join(os.tmpdir(), "saini-phool-bhandar");
const DATA_FILE = path.join(DATA_DIR, "enquiries.json");

async function readAll(): Promise<StoredEnquiry[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as StoredEnquiry[];
  } catch {
    return [];
  }
}

export async function saveEnquiry(
  input: EnquiryInput
): Promise<StoredEnquiry> {
  const record: StoredEnquiry = {
    ...input,
    id: `enq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    status: "New",
    createdAt: new Date().toISOString(),
  };

  await fs.mkdir(DATA_DIR, { recursive: true });
  const all = await readAll();
  all.push(record);
  await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2), "utf-8");

  return record;
}

export async function listEnquiries(): Promise<StoredEnquiry[]> {
  return readAll();
}
