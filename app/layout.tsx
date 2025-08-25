import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Developer Portfolio | Professional Web Development Services',
  description: 'Experienced full-stack developer specializing in React, Node.js, and modern web technologies. View my projects, skills, and client testimonials.',
  keywords: 'web developer, full-stack developer, React, Node.js, TypeScript, portfolio',
  authors: [{ name: 'Developer Portfolio' }],
  openGraph: {
    title: 'Developer Portfolio | Professional Web Development Services',
    description: 'Experienced full-stack developer specializing in React, Node.js, and modern web technologies.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Portfolio | Professional Web Development Services',
    description: 'Experienced full-stack developer specializing in React, Node.js, and modern web technologies.',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Access environment variable on server side
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
        {/* Pass bucket slug as prop to client component */}
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}