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
  const jobs = await pocketbase.collection('salary').getFullList()

  return (
    <div className='table-wrapper'>
      <Heading className='bg-purple-700 px-4 py-2 text-2xl font-semibold text-white'>
        Aggregate table
      </Heading>
      <Table jobs={jobs} />
    </div>
  )
}
