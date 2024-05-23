'use client'

// Internal Dependencies
import SummaryTable from '@/components/SummaryTable/SummaryTable'
import AggregateTable from '@/components/AggregateTable/AggregateTable'
import LineChart from '@/components/Chart/LineChart'

// Type definitions
import { Job, Summary } from '@/utils/pocketbase'
import { useState } from 'react'

export default function Analytics({
  jobs,
  summaries,
}: {
  jobs: Job[]
  summaries: Summary[]
}) {
  // To change the year of the table
  const [year, setYear] = useState<string>('')

  return (
    <>
      <div className='flex flex-col-reverse items-stretch justify-between gap-6 md:flex-row md:gap-0'>
        <SummaryTable summaries={summaries} setYear={setYear} />
        <LineChart
          summaries={
            // Sort the summaries according to the year
            summaries.sort((sumA, sumB) => sumA.year - sumB.year)
          }
        />
      </div>

      <div className='mx-auto my-8'>
        <AggregateTable year={year} jobs={jobs} />
      </div>
    </>
  )
}
