'use client'
import { useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

// Icon dependencies
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { BsDash } from 'react-icons/bs'

// Internal Dependencies
import Row from '@/components/Row'
import Heading from '@/components/Heading'

// Type definitions
import type { Specification } from '@/utils/constants'
import type { Salary } from '@/utils/pocketbase'

// Utility Dependencies
import { makeSpecification } from '@/utils/utils'

// Icons for the column by which the elements are sorted
const Icons = {
  Ascending: IoIosArrowUp,
  Descending: IoIosArrowDown,
  NotSorted: BsDash,
}

/**
 *
 * @param specifications The specifications array
 * @returns Functional Component of table
 */
export default function Table({ jobs }: { jobs: Salary[] }) {
  // Get the year that we're searching for
  const searchParams = useSearchParams()
  const year = searchParams.get('year')

  // Get the specification about each job
  const specifications = makeSpecification(jobs, year)

  // The column by which the data is sorted, by default the first column
  const [keyColumn, setKeyColumn] = useState<keyof Specification | null>(null)
  // Create a reference to mutate the Specification array
  const specificationArray = useRef(specifications)

  // Sort the specifications, if the key-column changes
  const handleSort = (column: keyof Specification) => {
    // Set the new key column
    setKeyColumn(column)
    // Sort the specifications, according to the new keyColumn
    specificationArray.current = specifications.sort(
      (specA: Specification, specB: Specification) =>
        specA[column] === specB[column]
          ? 0
          : specA[column] < specB[column]
            ? -1
            : 1,
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
        text: 'Aggregated Job Titles',
        column: 'job_title',
      },
      {
        text: 'Total jobs for the year',
        column: 'job_count',
      },
    ]

    return (
      <>
        <Heading className=' bg-purple-400 p-3 text-center font-inter text-lg font-medium'>
          Year: {year}
        </Heading>
        <div className='row'>
          {headings.map((col, index) => (
            <div
              key={index}
              onClick={() => handleSort(col.column as keyof Specification)}
            >
              {col.text}
              <span>{getIcon(col.column)}</span>
            </div>
          ))}
        </div>
      </>
    )
  }

  // If we cannot find the specified table, then return
  if (!year)
    return (
      <div className='index-table'>
        <div className='row'>
          <p className='w-full grow text-center text-stone-900/75'>
            Click on your favorite row of data to show more results!
          </p>
        </div>
      </div>
    )

  return (
    <div className='index-table'>
      {/* Fill the column headings */}
      <Header />
      {/* Fill the rows */}
      {specificationArray.current.map((specification: Specification, index) => (
        <Row
          data={
            {
              job_title: specification.job_title,
              job_count: specification.job_count,
            } as Specification
          }
          currencyColumns={[]}
          key={index}
        />
      ))}
    </div>
  )
}
