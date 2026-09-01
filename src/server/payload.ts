import 'server-only'

import configPromise from '@payload-config'
import { getPayload as getPayloadInstance, type Payload } from 'payload'

import { hasDatabase } from '@/config/env'

let cached: Promise<Payload> | null = null
let unavailableUntil = 0

const RETRY_AFTER_MS = 30_000

/**
 * Payload's Local API — queries the database directly from server components,
 * with no HTTP hop.
 *
 * Returns null instead of throwing when the CMS cannot be reached, so a
 * database problem degrades the site to its default content rather than
 * turning every page into an error.
 */
export async function getPayloadClient(): Promise<Payload | null> {
  if (!hasDatabase) return null
  if (Date.now() < unavailableUntil) return null

  try {
    cached ??= getPayloadInstance({ config: configPromise })
    return await cached
  } catch (error) {
    cached = null
    unavailableUntil = Date.now() + RETRY_AFTER_MS
    console.error('[payload] CMS unavailable, falling back to default content:', error)
    return null
  }
}

/**
 * Runs a CMS read and falls back to the given default if anything goes wrong.
 */
export async function fromCms<T>(
  label: string,
  read: (payload: Payload) => Promise<T | null | undefined>,
  fallback: T,
): Promise<T> {
  const payload = await getPayloadClient()
  if (!payload) return fallback

  try {
    const result = await read(payload)
    return result ?? fallback
  } catch (error) {
    console.error(`[payload] read failed (${label}), using default content:`, error)
    return fallback
  }
}
