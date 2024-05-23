// Internal Dependencies
import Heading from '@/components/Heading'
import Table from './Table'

// Utility Dependencies
import { pocketbase } from '@/utils/pocketbase'
import { fillSummary } from '@/utils/utils'

/**
 * The summary table for the salaries
 * @returns The function table of full summary table
 */
export default async function SummaryTable() {
  // Get all the data and make a summary of it
  let summaries = await pocketbase.collection('summary').getFullList()

  // If no summaries are present, then fetch and make summary
  if (summaries.length === 0) {
    // Fill the summary table
    summaries = await fillSummary()
    // Return a loader
    return <div>Loading...</div>
  }

  return (
    <div className='md:m-6 md:basis-1/2'>
      <Heading className='table-heading text-2xl'>Main Table</Heading>
      <Table summaries={summaries} />
    </div>
  )
}
