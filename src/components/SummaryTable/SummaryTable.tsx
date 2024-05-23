'use client'

// Internal Dependencies
import Heading from '@/components/Heading'
import Table from './Table'

// Type definitions
import { Summary } from '@/utils/pocketbase'
import { Dispatch, SetStateAction } from 'react'

/**
 * The summary table for the salaries
 * @returns The function table of full summary table
 */
export default function SummaryTable({
  summaries,
  setYear,
}: {
  summaries: Summary[]
  setYear: Dispatch<SetStateAction<string>>
}) {
  return (
    <div className='glass md:m-6 md:basis-1/2'>
      <Heading className='table-heading text-2xl'>Main Table</Heading>
      <Table summaries={summaries} setYear={setYear} />
    </div>
  )
}
