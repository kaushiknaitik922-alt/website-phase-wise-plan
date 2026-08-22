import type { ProductView } from '@/types/content'

/**
 * Specification table. Hidden entirely when no specifications have been
 * entered — an empty table would say less than nothing.
 */
export function SpecTable({ specifications }: { specifications: ProductView['specifications'] }) {
  if (specifications.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-line bg-surface px-5 py-4 text-sm text-muted">
        Full specifications are shared along with the quote. Tell us your application and we will
        confirm what suits it.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full min-w-[420px] border-collapse text-left text-sm">
        <tbody>
          {specifications.map((row, index) => (
            <tr key={row.label} className={index % 2 === 1 ? 'bg-surface' : undefined}>
              <th scope="row" className="w-2/5 px-5 py-3 font-semibold text-navy">
                {row.label}
              </th>
              <td className="px-5 py-3 text-muted">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
