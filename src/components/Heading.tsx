import React from 'react'
import { twMerge } from 'tailwind-merge'

export default function Heading({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <h1 id={id} className={twMerge('font-sora text-4xl', className)}>
      {children}
    </h1>
  )
}
