import Heading from '@/components/Heading'

// PocketBase
import { pocketbase } from '@/utils/pocketbase'

// Content/Constant dependencies
import { DATASET_URI } from '@/utils/constants'
import Anchor from '@/components/Anchor'

export default async function Home() {
  const data = await pocketbase.collection('salary').getOne('j5mr9zzhf1d8ama')

  return (
    <>
      <Heading>Analytics</Heading>
      <p>
        The data set we used is:{' '}
        <Anchor href={DATASET_URI} target='_blank'>
          here
        </Anchor>
      </p>

      <SummaryTable />
    </>
  )
}

async function SummaryTable() {
  // Get all the data and make a summary of it

  return <div></div>
}
