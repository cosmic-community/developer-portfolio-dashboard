import { Star, Quote, User, Calendar, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'
import type { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const clientName = testimonial.metadata?.client_name
  const clientTitle = testimonial.metadata?.client_title
  const company = testimonial.metadata?.company
  const clientPhoto = testimonial.metadata?.client_photo
  const testimonialText = testimonial.metadata?.testimonial_text
  const rating = testimonial.metadata?.rating
  const project = testimonial.metadata?.project
  const dateReceived = testimonial.metadata?.date_received

  const renderStars = (ratingValue: string | undefined) => {
    const numStars = parseInt(ratingValue || '0')
    return Array.from({ length: 5 }, (_, index) => {
      const filled = index < numStars ? 'text-yellow-400 fill-current' : 'text-gray-300'
      return (
        <Star
          key={index}
          className={`w-5 h-5 ${filled}`}
        />
      )
    })
  }

  return (
    <div className="card hover:shadow-md transition-shadow group">
      {/* Quote Icon */}
      <div className="flex items-center justify-between mb-4">
        <Quote className="h-8 w-8 text-gray-300" />
        {rating && (
          <div className="flex items-center">
            {renderStars(rating.key)}
          </div>
        )}
      </div>
      
      {/* Testimonial Text */}
      {testimonialText && (
        <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
          "{testimonialText}"
        </blockquote>
      )}
      
      {/* Client Info */}
      <div className="flex items-center gap-3 mb-4">
        {clientPhoto ? (
          <img
            src={`${clientPhoto.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
            alt={clientName}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="h-6 w-6 text-gray-400" />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900">{clientName}</p>
          <div className="text-sm text-gray-600">
            {clientTitle && company ? (
              <span>{clientTitle} at {company}</span>
            ) : clientTitle ? (
              <span>{clientTitle}</span>
            ) : company ? (
              <span>{company}</span>
            ) : null}
          </div>
        </div>
      </div>
      
      {/* Project Reference */}
      {project && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Related Project</p>
              <p className="text-sm text-gray-600">{project.title}</p>
            </div>
            {project.metadata?.demo_url && (
              <a
                href={project.metadata.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-600 hover:text-primary-700 inline-flex items-center transition-colors"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View
              </a>
            )}
          </div>
        </div>
      )}
      
      {/* Date Received */}
      {dateReceived && (
        <div className="flex items-center text-xs text-gray-500 mt-4 pt-4 border-t border-gray-200">
          <Calendar className="h-3 w-3 mr-1" />
          Received {format(new Date(dateReceived), 'MMM dd, yyyy')}
        </div>
      )}
    </div>
  )
}