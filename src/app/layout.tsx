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
      <body>
        <div className='mx-auto min-h-screen max-w-screen-lg bg-transparent p-6 text-white'>
          {children}
        </div>
      </body>
    </html>
  )
}
