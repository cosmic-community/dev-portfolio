import type { Skill } from '@/types'

interface SkillBadgeProps {
  skill: Skill
  showProficiency?: boolean
}

const proficiencyColors: Record<string, string> = {
  beginner: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  intermediate: 'bg-blue-100 text-blue-800 border-blue-200',
  advanced: 'bg-green-100 text-green-800 border-green-200',
  expert: 'bg-purple-100 text-purple-800 border-purple-200'
}

export default function SkillBadge({ skill, showProficiency = false }: SkillBadgeProps) {
  const name = skill.metadata?.name || skill.title
  const proficiencyKey = skill.metadata?.proficiency?.key
  const proficiencyValue = skill.metadata?.proficiency?.value
  
  const colorClass = proficiencyKey ? proficiencyColors[proficiencyKey] || 'bg-gray-100 text-gray-800 border-gray-200' : 'bg-gray-100 text-gray-800 border-gray-200'

  return (
    <div className={`card p-4 text-center border ${showProficiency && proficiencyKey ? colorClass : 'border-gray-200'} transition-all duration-200 hover:shadow-md`}>
      <div className="space-y-2">
        <h4 className="font-medium text-sm">{name}</h4>
        
        {showProficiency && proficiencyValue && (
          <span className="inline-block text-xs font-medium">
            {proficiencyValue}
          </span>
        )}
      </div>
    </div>
  )
}