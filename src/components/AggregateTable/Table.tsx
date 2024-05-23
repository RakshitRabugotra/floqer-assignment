'use client'
import { useMemo, useRef, useState } from 'react'

// Icon dependencies
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { BsDash } from 'react-icons/bs'

// Internal Dependencies
import Row from '@/components/Row'
import Heading from '@/components/Heading'

// Type definitions
import type { Specification } from '@/utils/constants'
import type { Job } from '@/utils/pocketbase'

// Utility Dependencies
import { makeSpecification, paginate } from '@/utils/utils'
import { twMerge } from 'tailwind-merge'

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
export default function Table({ jobs, year }: { jobs: Job[]; year: string }) {
  // Create a reference to mutate the Specification array
  const specificationArray = useRef([] as Specification[])
  // Create a reference to the paginated specifications
  const paginatedArray = useRef([] as Specification[][])

  // Get the specification about each job
  const specifications = useMemo(() => {
    specificationArray.current = makeSpecification(jobs, year)
    paginatedArray.current = paginate(specificationArray.current).slice(0, 1)
    return specificationArray.current
  }, [year, jobs])

  console.log(specificationArray.current)

  // The number of pages shown in the table
  const [showIndex, setIndex] = useState<number>(1)

  // The column by which the data is sorted, by default the first column
  const [keyColumn, setKeyColumn] = useState<keyof Specification | null>(null)

  const changePagination = (index: number) => {
    // Set the new number of rows to show
    paginatedArray.current = paginate(specificationArray.current).slice(
      0,
      index,
    )
  }

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
        <Heading className='p-3 text-center font-inter text-lg font-medium'>
          Year: {year}
        </Heading>
        <div className='row'>
          {headings.map((col, index) => (
            <div
              key={index}
              className='header'
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
  if (!year || year.length === 0)
    return (
      <div className='index-table'>
        <div className='row'>
          <p className='w-full grow text-center text-white/75'>
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
      {paginatedArray.current.map((value: Specification[], index) => (
        <div
          key={index}
          className='flex flex-row items-stretch justify-between'
        >
          <Page pages={value.slice(0, value.length / 2)} />
          <Page pages={value.slice(value.length / 2)} />
        </div>
      ))}
      {/* Show more button for the rows */}
      {showIndex <= Math.ceil(specificationArray.current.length / 10) && (
        <div className='mx-auto my-auto w-1/2'>
          <button
            onClick={() => {
              changePagination(showIndex + 1)
              setIndex((prev) => ++prev)
            }}
            className='bg-lime/60 hover:bg-lime my-3 w-full rounded-md p-2 text-base capitalize text-black/60 hover:text-white'
          >
            Show More
          </button>
        </div>
      )}
    </div>
  )
}

function Page({ pages }: { pages: Specification[] }) {
  return (
    <div className='basis-1/2'>
      <div>
        {pages.map((specification: Specification, ind) => (
          <Row
            data={
              {
                job_title: specification.job_title,
                job_count: specification.job_count,
              } as Specification
            }
            currencyColumns={[]}
            key={ind}
            className={twMerge(
              ind % 2 === 0 ? 'bg-slate-500/35 hover:bg-black/50' : '',
              'min-h-28',
            )}
          />
        ))}
      </div>
    </div>
  )
}
