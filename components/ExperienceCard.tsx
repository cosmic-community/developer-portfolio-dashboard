import { MapPin, Calendar, Building, Badge } from 'lucide-react'
import { format } from 'date-fns'
import type { WorkExperience } from '@/types'

interface ExperienceCardProps {
  experience: WorkExperience
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const jobTitle = experience.metadata?.job_title
  const company = experience.metadata?.company
  const companyLogo = experience.metadata?.company_logo
  const startDate = experience.metadata?.start_date
  const endDate = experience.metadata?.end_date
  const currentPosition = experience.metadata?.current_position
  const location = experience.metadata?.location
  const employmentType = experience.metadata?.employment_type
  const description = experience.metadata?.description
  const achievements = experience.metadata?.achievements

  const formatDateRange = () => {
    if (!startDate) return ''
    
    const start = format(new Date(startDate), 'MMM yyyy')
    const end = currentPosition ? 'Present' : endDate ? format(new Date(endDate), 'MMM yyyy') : 'Present'
    
    return `${start} - ${end}`
  }

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        {companyLogo && (
          <div className="flex-shrink-0">
            <img
              src={`${companyLogo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
              alt={`${company} logo`}
              className="w-16 h-16 rounded-lg object-cover"
            />
          </div>
        )}
        
        {/* Experience Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{jobTitle}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-gray-600">
                  <Building className="h-4 w-4 mr-1" />
                  <span className="font-medium">{company}</span>
                </div>
                {employmentType && (
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                    {employmentType.value}
                  </span>
                )}
              </div>
            </div>
            
            {currentPosition && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Current
              </span>
            )}
          </div>
          
          {/* Date Range and Location */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDateRange()}
            </div>
            {location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {location}
              </div>
            )}
          </div>
          
          {/* Description */}
          {description && (
            <div className="mb-4">
              <div 
                className="prose prose-sm text-gray-600 max-w-none"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          )}
          
          {/* Key Achievements */}
          {achievements && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                <Badge className="h-4 w-4 mr-1" />
                Key Achievements
              </h4>
              <div 
                className="prose prose-sm text-gray-600 max-w-none"
                dangerouslySetInnerHTML={{ __html: achievements }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}