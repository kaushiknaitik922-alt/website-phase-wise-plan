/** Joins class names, dropping falsy values. */
export const cn = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ')

/** 8587060393 → +91 85870 60393 */
export const formatPhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, '').slice(-10)
  if (digits.length !== 10) return raw
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
}

export const telHref = (raw: string): string => {
  const digits = raw.replace(/\D/g, '').slice(-10)
  return `tel:+91${digits}`
}
