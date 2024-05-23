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
            `basis-1/${length}`,
            index % 2 === 1 ? 'border-x-2' : '',
          )}
          key={index}
        >
          {currencyColumns.indexOf(column) !== -1 ? USDollar(value) : value}
        </div>
      ))}
    </a>
  )
}
