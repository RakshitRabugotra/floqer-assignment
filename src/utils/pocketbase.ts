import PocketBase, { LocalAuthStore, RecordService } from 'pocketbase'

// The interface for salaries
export interface Job {
  work_year: string
  experience_level: string
  employment_type: string
  job_title: string
  salary: number
  salary_currency: string
  salary_in_usd: number
  employee_residence: string
  remote_ratio: string
  company_location: string
  company_size: string
}

export interface Summary {
  year: number
  year_job_count: number
  average_salary_usd: number
}

interface TypedPocketBase extends PocketBase {
  collection(idOrName: string): RecordService // default fallback for any other collection
  collection(idOrName: 'job'): RecordService<Job>
  collection(idOrName: 'summary'): RecordService<Summary>
}

const store = new LocalAuthStore()

export const pocketbase = new PocketBase(
  'https://floqer-assignmen.fly.dev/',
  store,
) as TypedPocketBase
