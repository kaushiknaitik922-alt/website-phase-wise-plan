import { cache } from 'react'

import { defaultWorkingHours, site } from '@/config/site'
import { fromCms } from '@/server/payload'
import type { SiteSettingsView, WorkingHoursView } from '@/types/content'

import { orDefault, toImage, toStringList } from './mappers'

const fallbackSettings: SiteSettingsView = {
  companyName: site.companyName,
  tagline: site.tagline,
  logo: null,
  experienceYears: site.experienceYears,
  establishedYear: null,
  legalName: null,
  gstNumber: null,
  footerAbout: site.footerAbout,
  phonePrimary: site.phonePrimary,
  phoneSecondary: site.phoneSecondary,
  whatsappPrimary: site.whatsappPrimary,
  whatsappSecondary: site.whatsappSecondary,
  email: site.email || null,
  addressLines: [...site.addressLines],
  googleMapsEmbedUrl: site.googleMapsEmbedUrl || null,
  supplyAreas: [...site.supplyAreas],
  defaultSeo: { metaTitle: null, metaDescription: null, ogImage: null },
}

export const getSiteSettings = cache(
  async (): Promise<SiteSettingsView> =>
    fromCms(
      'site-settings',
      async (payload) => {
        const doc = (await payload.findGlobal({
          slug: 'site-settings',
          depth: 1,
          overrideAccess: false,
        })) as unknown as Record<string, unknown>

        return {
          companyName: orDefault(doc.companyName as string, fallbackSettings.companyName),
          tagline: orDefault(doc.tagline as string, fallbackSettings.tagline),
          logo: toImage(doc.logo),
          experienceYears: orDefault(
            doc.experienceYears as number,
            fallbackSettings.experienceYears,
          ),
          establishedYear: (doc.establishedYear as number) ?? null,
          legalName: (doc.legalName as string) ?? null,
          gstNumber: (doc.gstNumber as string) ?? null,
          footerAbout: orDefault(doc.footerAbout as string, fallbackSettings.footerAbout),
          phonePrimary: orDefault(doc.phonePrimary as string, fallbackSettings.phonePrimary),
          phoneSecondary: orDefault(doc.phoneSecondary as string, fallbackSettings.phoneSecondary),
          whatsappPrimary: orDefault(
            doc.whatsappPrimary as string,
            fallbackSettings.whatsappPrimary ?? '',
          ),
          whatsappSecondary: orDefault(
            doc.whatsappSecondary as string,
            fallbackSettings.whatsappSecondary ?? '',
          ),
          email: (doc.email as string) ?? fallbackSettings.email,
          addressLines: toStringList(doc.addressLines, 'line', fallbackSettings.addressLines),
          googleMapsEmbedUrl: (doc.googleMapsEmbedUrl as string) ?? null,
          supplyAreas: toStringList(doc.supplyAreas, 'area', fallbackSettings.supplyAreas),
          defaultSeo: {
            metaTitle:
              ((doc.defaultSeo as Record<string, unknown>)?.metaTitle as string) ?? null,
            metaDescription:
              ((doc.defaultSeo as Record<string, unknown>)?.metaDescription as string) ?? null,
            ogImage: toImage((doc.defaultSeo as Record<string, unknown>)?.ogImage),
          },
        }
      },
      fallbackSettings,
    ),
)

const dayLabels = new Map(defaultWorkingHours.map((d) => [d.day as string, d.label as string]))

const fallbackHours: WorkingHoursView = {
  days: defaultWorkingHours.map((d) => ({
    day: d.day,
    label: d.label,
    isClosed: d.isClosed,
    openTime: d.openTime,
    closeTime: d.closeTime,
  })),
  note: null,
}

export const getWorkingHours = cache(
  async (): Promise<WorkingHoursView> =>
    fromCms(
      'working-hours',
      async (payload) => {
        const doc = (await payload.findGlobal({
          slug: 'working-hours',
          overrideAccess: false,
        })) as unknown as Record<string, unknown>

        const rows = Array.isArray(doc.days) ? doc.days : []
        if (rows.length === 0) return fallbackHours

        const days = rows
          .map((row) => row as Record<string, unknown>)
          .filter((row) => typeof row.day === 'string')
          .map((row) => ({
            day: row.day as string,
            label: dayLabels.get(row.day as string) ?? (row.day as string),
            isClosed: Boolean(row.isClosed),
            openTime: (row.openTime as string) ?? '',
            closeTime: (row.closeTime as string) ?? '',
          }))

        // Keep Monday-first ordering regardless of how the rows were saved.
        const order = new Map(defaultWorkingHours.map((d, index) => [d.day as string, index]))
        days.sort((a, b) => (order.get(a.day) ?? 99) - (order.get(b.day) ?? 99))

        return { days, note: (doc.note as string) ?? null }
      },
      fallbackHours,
    ),
)
