// Internal Dependencies
import Heading from '@/components/Heading'
import Anchor from '@/components/Anchor'
import SummaryTable from '@/components/SummaryTable/SummaryTable'
import AggregateTable from '@/components/AggregateTable/AggregateTable'
import LineChart from '@/components/Chart/LineChart'

// Content/Constant dependencies
import { DATASET_URI } from '@/utils/constants'
import { pocketbase } from '@/utils/pocketbase'
import { fillSummary } from '@/utils/utils'

export default async function Home() {
  let summaries = await pocketbase.collection('summary').getFullList()
  // If the summaries is empty, then fill it
  if (summaries.length <= 0) summaries = await fillSummary()

  return (
    <>
      <div className='mb-6 md:p-4'>
        <Heading className='font-bold md:text-7xl'>Analytics</Heading>
        <div className='py-6 font-medium text-stone-900/70'>
          Welcome back to the Dashboard!
          <div>
            The data set we used is:{' '}
            <Anchor href={DATASET_URI} target='_blank'>
              here
            </Anchor>
          </div>
        </div>
      </div>

      <div className='flex flex-col-reverse items-stretch justify-between gap-6 md:flex-row md:gap-0'>
        <SummaryTable />
        <LineChart
          summaries={
            // Sort the summaries according to the year
            summaries.sort((sumA, sumB) => sumA.year - sumB.year)
          }
        />
      </div>

      <div className='max-w-screen-md p-4'>
        <AggregateTable />
      </div>
    </>
  )
}
