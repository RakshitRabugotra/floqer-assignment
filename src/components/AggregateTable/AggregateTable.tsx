// Internal Dependencies
import Heading from '@/components/Heading'
import Table from './Table'

// Type definitions
import { Job } from '@/utils/pocketbase'

/**
 * The summary table for the salaries
 * @returns The function table of full summary table
 */
export default function AggregateTable({ jobs, year }: { jobs: Job[], year: string }) {
  return (
    <div className='glass'>
      <Heading className='table-heading text-2xl'>Aggregate table</Heading>
      <Table jobs={jobs} year={year}/>
    </div>
  )
}
