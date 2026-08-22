import { Icon } from '@/components/ui/Icon'

/**
 * Google Maps embed. Until the exact pin is confirmed the map is replaced by
 * the written address rather than a guessed location.
 */
export function MapEmbed({
  embedUrl,
  addressLines,
  directionsNote,
}: {
  embedUrl?: string | null
  addressLines: string[]
  directionsNote?: string
}) {
  if (!embedUrl) {
    return (
      <div className="rounded-lg border border-dashed border-line bg-surface p-6">
        <p className="flex items-start gap-3 text-sm text-navy">
          <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-green" />
          <span>
            <span className="block font-semibold">Factory address</span>
            <span className="mt-1 block text-muted">{addressLines.join(', ')}</span>
          </span>
        </p>
        {directionsNote ? <p className="mt-3 text-sm text-muted">{directionsNote}</p> : null}
      </div>
    )
  }

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-line">
        <iframe
          src={embedUrl}
          title="Factory location on Google Maps"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[320px] w-full border-0"
          allowFullScreen
        />
      </div>
      {directionsNote ? <p className="mt-3 text-sm text-muted">{directionsNote}</p> : null}
    </div>
  )
}
