import Link from 'next/link'
import { ArrowLeft, Plus, Briefcase, MapPin, Calendar } from 'lucide-react'
import { getWorkExperience } from '@/lib/cosmic'
import { format } from 'date-fns'
import ExperienceCard from '@/components/ExperienceCard'

export default async function ExperiencePage() {
  const experiences = await getWorkExperience()

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
                <h1 className="text-2xl font-bold text-gray-900">Work Experience</h1>
                <p className="text-gray-600">{experiences.length} positions in your career history</p>
              </div>
            </div>
            
            <Link
              href="/experience/new"
              className="btn-primary"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Experience
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {experiences.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Briefcase className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No experience yet</h3>
              <p className="text-gray-600 mb-6">Start documenting your career journey by adding your work experience.</p>
              <Link
                href="/experience/new"
                className="btn-primary"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Your First Position
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}