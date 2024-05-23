// Internal Dependencies
import Heading from '@/components/Heading'
import Anchor from '@/components/Anchor'
import Analytics from '@/components/Analytics'

// Content/Constant dependencies
import { DATASET_URI } from '@/utils/constants'
import { pocketbase } from '@/utils/pocketbase'
import { fillSummary } from '@/utils/utils'

// Gemini
import { run } from '@/utils/gemini'

export default async function Home() {
  let summaries = null
  try {
    const jobs = await pocketbase
      .collection('job')
      .getFullList({ requestKey: null })
    summaries = await pocketbase
      .collection('summary')
      .getFullList({ requestKey: null })
  } catch (error) {
    return <div>Loading...</div>
  }

  // If the summaries is empty, then fill it
  if (summaries.length <= 0) summaries = await fillSummary()

  const response = await run(summaries)

  return (
    <>
      <div className='mb-6 md:p-4'>
        <Heading className='font-bold md:text-7xl'>Analytics</Heading>
        <div className='py-6 font-medium text-white/70'>
          Welcome back to the Dashboard!
          <div>
            The data set we used is:{' '}
            <Anchor href={DATASET_URI} target='_blank'>
              here
            </Anchor>
          </div>
        </div>
        <p className='py-6 font-medium text-white/70'>
          Gemini says:
          <br />
          {response}
        </p>
      </div>

      <Analytics summaries={summaries} jobs={jobs} />
    </>
  )
}
