import { Star, Clock, BookOpen } from 'lucide-react'
import type { Skill } from '@/types'

interface SkillCardProps {
  skill: Skill
}

export default function SkillCard({ skill }: SkillCardProps) {
  const skillName = skill.metadata?.skill_name || skill.title
  const proficiency = skill.metadata?.proficiency
  const yearsExperience = skill.metadata?.years_experience
  const description = skill.metadata?.description

  const getProficiencyColor = (level: string | undefined) => {
    switch (level) {
      case 'expert':
        return 'bg-green-100 text-green-800'
      case 'advanced':
        return 'bg-blue-100 text-blue-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'beginner':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderStars = (level: string | undefined) => {
    const levels = { expert: 5, advanced: 4, intermediate: 3, beginner: 2 }
    const count = levels[level as keyof typeof levels] || 1
    
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < count ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="card hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{skillName}</h3>
        {proficiency && (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getProficiencyColor(proficiency.key)}`}>
            {proficiency.value}
          </span>
        )}
      </div>
      
      {/* Proficiency Stars */}
      {proficiency && (
        <div className="flex items-center gap-1 mb-3">
          {renderStars(proficiency.key)}
        </div>
      )}
      
      {/* Years of Experience */}
      {yearsExperience && (
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Clock className="h-4 w-4 mr-1" />
          {yearsExperience} year{yearsExperience !== 1 ? 's' : ''} experience
        </div>
      )}
      
      {/* Description */}
      {description && (
        <div className="text-sm text-gray-600 line-clamp-3">
          <BookOpen className="h-4 w-4 inline mr-1" />
          {description}
        </div>
      )}
    </div>
  )
}