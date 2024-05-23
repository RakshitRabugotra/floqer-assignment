'use client'
import dynamic from 'next/dynamic'
import 'chart.js/auto'
import { useEffect, useMemo, useState } from 'react'
import { Summary, createClient } from '@/utils/pocketbase'
import Heading from '../Heading'

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
})

type LineChartDataType = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    fill: boolean
    borderColor: string
    tension: 0.1
  }[]
}

export default function LineChart({ summaries }: { summaries: Summary[] }) {
  // Set the data for different lines
  const data = useMemo<LineChartDataType>(
    () =>
      ({
        labels: summaries.map((summary, index) => summary.year.toString()),
        datasets: [
          {
            label: 'Salary Trend in USD',
            data: summaries.map((summary, index) => summary.average_salary_usd),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
          },
        ],
      }) as LineChartDataType,
    [summaries],
  )

  if (Object.entries(data).length === 0) {
    return <div className='font-sora text-4xl'>Loading...</div>
  }

  return (
    <div className='glass flex flex-col justify-around p-4 md:m-6 md:basis-1/2'>
      <Heading className='text-2xl font-semibold capitalize md:text-4xl'>
        The trends we see:
      </Heading>
      {data ? (
        <Line
          data={data}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: '#ffffffbd',
                },
              },
            },
            scales: {
              y: {
                ticks: { color: '#ffffffbd' },
              },
              x: {
                ticks: { color: '#ffffffbd' },
              },
            },
          }}
          className='self-end'
        />
      ) : (
        <div className='font-sora text-4xl'>Loading...</div>
      )}
    </div>
  )
}
