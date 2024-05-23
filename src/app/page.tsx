// Internal Dependencies
import Heading from '@/components/Heading'
import Anchor from '@/components/Anchor'
import SummaryTable from '@/components/SummaryTable/SummaryTable'
import AggregateTable from '@/components/AggregateTable/AggregateTable'

// Content/Constant dependencies
import { DATASET_URI } from '@/utils/constants'

export default async function Home() {
  return (
    <>
      <div className='my-12'>
        <Heading>Analytics</Heading>
        <p>
          Welcome back to the Dashboard! <br />
          The data set we used is:{' '}
          <Anchor href={DATASET_URI} target='_blank'>
            here
          </Anchor>
        </p>
      </div>

      <SummaryTable />

      <AggregateTable />
    </>
  )
}
