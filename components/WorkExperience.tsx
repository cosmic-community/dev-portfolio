import type { WorkExperience } from '@/types'
import WorkExperienceItem from './WorkExperienceItem'

interface WorkExperienceProps {
  experiences: WorkExperience[]
}

export default function WorkExperience({ experiences }: WorkExperienceProps) {
  if (!experiences || experiences.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No work experience available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <WorkExperienceItem
            key={experience.id}
            experience={experience}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>
    </div>
  )
}