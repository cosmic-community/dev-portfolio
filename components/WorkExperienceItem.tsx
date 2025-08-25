import type { WorkExperience } from '@/types'
import { formatDateRange } from '@/lib/cosmic'

interface WorkExperienceItemProps {
  experience: WorkExperience
  isLast?: boolean
}

export default function WorkExperienceItem({ experience, isLast = false }: WorkExperienceItemProps) {
  const title = experience.metadata?.title || ''
  const company = experience.metadata?.company || ''
  const description = experience.metadata?.description || ''
  const technologies = experience.metadata?.technologies || ''
  const startDate = experience.metadata?.start_date || ''
  const endDate = experience.metadata?.end_date
  const current = experience.metadata?.current

  const dateRange = startDate ? formatDateRange(startDate, endDate, current) : ''

  return (
    <div className="relative">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-200"></div>
      )}
      
      {/* Timeline Dot */}
      <div className="absolute left-4 top-4 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-sm"></div>
      
      {/* Content */}
      <div className="ml-16 pb-8">
        <div className="card">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
              <p className="text-lg text-primary-600 font-medium mb-2">{company}</p>
              {current && (
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Current Position
                </span>
              )}
            </div>
            
            {dateRange && (
              <div className="text-gray-500 font-medium lg:text-right">
                {dateRange}
              </div>
            )}
          </div>
          
          {description && (
            <div className="prose prose-gray max-w-none mb-4">
              {description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-3 last:mb-0 text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
          
          {technologies && (
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Key Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {technologies.split(',').map((tech, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}