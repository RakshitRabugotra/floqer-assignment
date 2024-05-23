import { Specification } from './constants'
import { Salary, Summary, pocketbase } from './pocketbase'

/**
 * Converter to convert currency (USD)
 */
export const converter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

/**
 * Formats number to currency (USD)
 * @param currency
 * @returns The number converted to string with USD sign
 */
export const USDollar = (currency: number): string => converter.format(currency)

/**
 * The function which groups the array based on some key attribute
 * @param list The array to group from
 * @param keyGetter The attribute to group by
 * @returns A map with entries list[i] grouped in unique keyGetter keys
 */
export function groupBy<K, V>(
  list: Array<V>,
  keyGetter: (input: V) => K,
): Map<K, Array<V>> {
  // Make a new map and do the grouping using this
  const map = new Map<K, Array<V>>()
  // Iterate over the list and group the object
  list.forEach((item) => {
    const key = keyGetter(item)
    const collection = map.get(key)
    if (!collection) {
      map.set(key, [item])
    } else {
      collection.push(item)
    }
  })
  return map
}

/**
 * Takes average of the array based on some getter attribute
 * @param list The array to get the average from
 * @param keyGetter The attribute to take average of
 * @returns The average of the attribute in the given array of type V
 */
export function average<T>(
  list: Array<T>,
  keyGetter: (input: T) => number,
  digits?: number,
): number {
  let attrTotal = 0
  list.forEach((item) => (attrTotal += keyGetter(item)))

  return typeof digits !== 'undefined'
    ? parseFloat((attrTotal / list.length).toFixed(2))
    : attrTotal / list.length
}

/**
 * Summarizes the data given in the Salary table
 * @param data The array of Salary data
 * @returns An array of Summary data
 */
export function makeSummary(data: Salary[]): Summary[] {
  // Make a group of salary by their year
  const groupedSalaries = groupBy<string, Salary>(
    data,
    (salary) => salary.work_year,
  )
  // Create a new Object
  const summary = [] as Summary[]
  // Iterate over the grouped salaries by year and make a group of them
  groupedSalaries.forEach((salaries: Salary[], year: string) => {
    summary.push({
      year: parseInt(year),
      year_job_count: salaries.length,
      average_salary_usd: average(
        salaries,
        (salary) => salary.salary_in_usd,
        2,
      ),
    } as Summary)
  })

  return summary
}

/**
 * Fills the summary table by taking data from the salary table
 */
export async function fillSummary(): Promise<Summary[]> {
  // Fetch the data from the salary table
  const data = await pocketbase.collection('salary').getFullList()
  // Make a summary table from it
  const summarizedData = makeSummary(data)
  // Upload the summary data
  summarizedData.forEach(async (summary, index) => {
    // Add the data to the table
    console.log(summary)
    const response = await pocketbase
      .collection('summary')
      .create(summary, { requestKey: null })
    console.log(response)
  })
  // Return the summarized data
  return summarizedData
}

export function makeSpecification(
  data: Salary[],
  work_year: Salary['work_year'] | null,
): Specification[] {
  // If the work year isn't defined
  if (!work_year) return []

  // Make a group of salary by their year
  const groupedSalaries = groupBy<string, Salary>(
    data,
    (salary) => salary.work_year,
  )
  // Create a new Object
  const specification = [] as Specification[]
  const jobs = groupedSalaries.get(work_year as string)

  // If the jobs weren't found, then return
  if (!jobs) return specification

  // Group the jobs by their title
  const groupedTitles = groupBy<string, Salary>(jobs, (job) => job.job_title)

  // Iterate over the grouped jobs by their title and record the specifications for each job-title
  groupedTitles.forEach((jobs, jobTitle, index) => {
    specification.push({
      year: parseInt(work_year as string),
      job_title: jobTitle,
      job_count: jobs.length,
    } as Specification)
  })
  return specification
}
