'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          An error occurred while loading the page. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="btn-primary mr-4"
        >
          Try Again
        </button>
        <a
          href="/"
          className="btn-secondary"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}