/**
 * Small in-memory rate limiter for the enquiry endpoint.
 *
 * Per server instance, so it is a speed bump rather than a wall — enough to
 * stop a form-spam script, while the honeypot and validation catch the rest.
 * Move to a shared store if enquiry volume ever justifies it.
 */
const hits = new Map<string, number[]>()

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5

export const checkRateLimit = (
  key: string,
  now = Date.now(),
): { allowed: boolean; retryAfterSeconds: number } => {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS)

  if (recent.length >= MAX_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((WINDOW_MS - (now - recent[0])) / 1000)
    hits.set(key, recent)
    return { allowed: false, retryAfterSeconds }
  }

  recent.push(now)
  hits.set(key, recent)

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 500) {
    for (const [existingKey, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(existingKey)
    }
  }

  return { allowed: true, retryAfterSeconds: 0 }
}
