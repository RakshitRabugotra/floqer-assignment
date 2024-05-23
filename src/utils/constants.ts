/* Constants for our project */

export const APP_TITLE = "Floqer's Assignment"
export const APP_DESCRIPTION = "Page requested as per the Floqer's assignment"

/* Content-based constants */
export const DATASET_URI =
  'https://www.kaggle.com/datasets/chopper53/machine-learning-engineer-salary-in-2024'

/* Type definition for the table content */
export type Specification = {
  year: number
  job_title: string
  job_count: number
}