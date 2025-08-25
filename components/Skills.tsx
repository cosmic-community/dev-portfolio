import type { Skill } from '@/types'
import SkillBadge from './SkillBadge'

interface SkillsProps {
  skillsByCategory: Record<string, Skill[]>
}

const categoryDisplayNames: Record<string, string> = {
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  database: 'Databases',
  tools: 'Tools & Platforms',
  other: 'Other Skills'
}

const categoryOrder = ['frontend', 'backend', 'database', 'tools', 'other']

export default function Skills({ skillsByCategory }: SkillsProps) {
  if (!skillsByCategory || Object.keys(skillsByCategory).length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No skills available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {categoryOrder
        .filter(categoryKey => {
          const skills = skillsByCategory[categoryKey];
          return skills && skills.length > 0;
        })
        .map((categoryKey) => {
          const skills = skillsByCategory[categoryKey];
          
          // Early return safety check
          if (!skills || skills.length === 0) {
            return null;
          }
          
          return (
            <div key={categoryKey} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {categoryDisplayNames[categoryKey] || 'Skills'}
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {skills.map((skill) => (
                  <SkillBadge key={skill.id} skill={skill} showProficiency />
                ))}
              </div>
            </div>
          )
        })}
    </div>
  )
}