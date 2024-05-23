// Internal Dependencies
import Heading from '@/components/Heading'
import Table from './Table'

// Utility Dependencies
import { pocketbase } from '@/utils/pocketbase'
/**
 * The summary table for the salaries
 * @returns The function table of full summary table
 */
export default async function AggregateTable() {
  // Get all the data and make a summary of it
  const jobs = await pocketbase.collection('job').getFullList()

  return (
    <div>
      <Heading className='table-heading text-2xl'>Aggregate table</Heading>
      <Table jobs={jobs} />
    </div>
  )
}
