import type { Metadata } from 'next'
import {
  APP_TITLE as title,
  APP_DESCRIPTION as description,
} from '@/utils/constants'
import './globals.css'

export const metadata: Metadata = {
  title,
  description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='min-h-screen bg-slate-100 text-stone-900'>
        {children}
      </body>
    </html>
  )
}
