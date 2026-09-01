import type { EnquiryInput } from '@/lib/validation/enquiry'

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const rows = (enquiry: EnquiryInput, productLabel?: string) =>
  [
    ['Name', enquiry.name],
    ['Company', enquiry.companyName],
    ['Phone', enquiry.phone],
    ['Email', enquiry.email],
    ['Product', productLabel ?? enquiry.productInterest],
    ['Quantity', enquiry.quantity],
    ['Message', enquiry.message],
  ].filter(([, value]) => Boolean(value)) as [string, string][]

export const enquiryEmail = (enquiry: EnquiryInput, productLabel?: string) => {
  const entries = rows(enquiry, productLabel)

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f5f7fa;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#1a202c">
    <table role="presentation" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px">
      <tr>
        <td style="background:#1c3557;color:#ffffff;padding:20px 24px;border-radius:8px 8px 0 0">
          <p style="margin:0;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#9fb3cd">New website enquiry</p>
          <h1 style="margin:6px 0 0;font-size:20px">${escapeHtml(enquiry.name)}</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 24px 20px">
          <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px">
            ${entries
              .map(
                ([label, value]) => `<tr>
              <th align="left" style="width:32%;padding:10px 0;border-bottom:1px solid #edf2f7;color:#5a6678;font-weight:600;vertical-align:top">${escapeHtml(label)}</th>
              <td style="padding:10px 0;border-bottom:1px solid #edf2f7;white-space:pre-wrap">${escapeHtml(value)}</td>
            </tr>`,
              )
              .join('')}
          </table>
          <p style="margin:18px 0 0;font-size:13px;color:#5a6678">
            Reply to this email, or call ${escapeHtml(enquiry.phone)} directly.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`

  const text = entries.map(([label, value]) => `${label}: ${value}`).join('\n')

  return {
    subject: `Website enquiry — ${enquiry.name}${enquiry.companyName ? ` (${enquiry.companyName})` : ''}`,
    html,
    text,
  }
}
