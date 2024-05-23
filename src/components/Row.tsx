import { twMerge } from 'tailwind-merge'

// Utility Dependencies
import { USDollar } from '@/utils/utils'

// Type definitions
import type { Summary } from '@/utils/pocketbase'
import type { Specification } from '@/utils/constants'

export default function Row({
  data,
  hover,
  currencyColumns,
}: {
  data: Summary | Specification
  hover?: boolean
  currencyColumns: string[]
}) {
  const entries = Object.entries(data)
  const length = entries.length
  const url = data?.year ? `/?year=${data.year}` : '#'

  return (
    <a
      className={twMerge(
        'row',
        url === '#' ? 'pointer-events-none cursor-default' : '',
        hover ? 'hover-touchable' : '',
      )}
      href={url}
      target='_self'
    >
      {/* Print all the rows */}
      {entries.map(([column, value], index) => (
        <div
          className={twMerge(
            'inline-flex items-center justify-between gap-2 text-wrap px-4',
            `basis-1/${length}`,
          )}
          key={index}
        >
          {currencyColumns.indexOf(column) !== -1 ? USDollar(value) : value}
        </div>
      ))}
    </a>
  )
}
