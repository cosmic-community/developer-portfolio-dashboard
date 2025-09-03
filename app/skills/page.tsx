import Link from 'next/link'
import { ArrowLeft, Plus, Star, Filter } from 'lucide-react'
import { getSkills } from '@/lib/cosmic'
import SkillCard from '@/components/SkillCard'

export default async function SkillsPage() {
  const skills = await getSkills()

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.metadata?.category?.value || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {} as Record<string, typeof skills>)

  const categoryOrder = ['Frontend', 'Backend', 'Database', 'Tools & DevOps', 'Design', 'Other']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <div className="h-6 border-l border-gray-300" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Skills</h1>
                <p className="text-gray-600">{skills.length} skills in {Object.keys(skillsByCategory).length} categories</p>
              </div>
            </div>
            
            <Link
              href="/skills/new"
              className="btn-primary"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Skill
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {skills.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No skills yet</h3>
              <p className="text-gray-600 mb-6">Start showcasing your expertise by adding your first skill.</p>
              <Link
                href="/skills/new"
                className="btn-primary"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Your First Skill
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {categoryOrder
              .filter(categoryKey => {
                const skills = skillsByCategory[categoryKey]
                return skills && skills.length > 0
              })
              .map((categoryKey) => {
                const skills = skillsByCategory[categoryKey]
                
                if (!skills || skills.length === 0) {
                  return null
                }
                
                return (
                  <div key={categoryKey}>
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="text-xl font-semibold text-gray-900">{categoryKey}</h2>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        {skills.length} skills
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {skills.map((skill) => (
                        <SkillCard key={skill.id} skill={skill} />
                      ))}
                    </div>
                  </div>
                )
              })}
          </div>
        )}
      </main>
    </div>
  )
}