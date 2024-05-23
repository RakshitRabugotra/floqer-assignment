'use client'
import { useEffect, useRef, useState } from 'react'

// Icon dependencies
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { BsDash } from 'react-icons/bs'

// Internal Dependencies
import Row from '@/components/Row'
// Type definitions
import type { Summary } from '@/utils/pocketbase'

// Icons for the column by which the elements are sorted
const Icons = {
  Ascending: IoIosArrowUp,
  Descending: IoIosArrowDown,
  NotSorted: BsDash,
}

/**
 *
 * @param summaries The summaries array
 * @returns Functional Component of table
 */
export default function Table({ summaries }: { summaries: Summary[] }) {
  // The column by which the data is sorted, by default the first column
  const [keyColumn, setKeyColumn] = useState<keyof Summary | null>(null)
  // Create a reference to mutate the summary array
  const summaryArray = useRef(summaries)

  // Sort the summaries, if the key-column changes
  const handleSort = (column: keyof Summary) => {
    // Set the new key column
    setKeyColumn(column)
    // Sort the summaries, according to the new keyColumn
    summaryArray.current = summaries.sort(
      (sumA: Summary, sumB: Summary) => sumA[column] - sumB[column],
    )
  }

  // The header of the table, which can change the state of the component
  function Header() {
    // Get the icon for the header
    const getIcon = (columnName: string) =>
      columnName === keyColumn ? <Icons.Descending /> : <Icons.NotSorted />

    // Definitions of the heading in the table
    const headings = [
      {
        text: 'Year',
        column: 'year',
      },
      {
        text: 'Total jobs for the year',
        column: 'year_job_count',
      },
      {
        text: 'Average salary in USD',
        column: 'average_salary_usd',
      },
    ]

    return (
      <div className='row'>
        {headings.map((col, index) => (
          <div
            key={index}
            className='header'
            onClick={() => handleSort(col.column as keyof Summary)}
          >
            {col.text}
            <span>{getIcon(col.column)}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='index-table [&>*:nth-child(even)]:bg-slate-500/15'>
      {/* Fill the column headings */}
      <Header />
      {/* Fill the rows */}
      {summaryArray.current.map((summary: Summary, index) => (
        <Row
          data={
            {
              year: summary.year,
              year_job_count: summary.year_job_count,
              average_salary_usd: summary.average_salary_usd,
            } as Summary
          }
          currencyColumns={['average_salary_usd']}
          key={index}
          hover
        />
      ))}
    </div>
  )
}
