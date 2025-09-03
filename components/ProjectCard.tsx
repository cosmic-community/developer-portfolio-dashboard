import Link from 'next/link'
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react'
import { format } from 'date-fns'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const featuredImage = project.metadata?.featured_image
  const completionDate = project.metadata?.completion_date
  const projectType = project.metadata?.project_type
  const technologies = project.metadata?.technologies
  const demoUrl = project.metadata?.demo_url
  const githubUrl = project.metadata?.github_url
  const isFeatured = project.metadata?.featured

  return (
    <div className="card group hover:shadow-lg transition-shadow">
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
            Featured
          </span>
        </div>
      )}
      
      {/* Project Image */}
      {featuredImage && (
        <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      {/* Project Info */}
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.title}</h3>
          {projectType && (
            <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
              <Tag className="h-3 w-3 mr-1" />
              {projectType.value}
            </span>
          )}
        </div>
        
        {project.metadata?.description && (
          <div 
            className="text-sm text-gray-600 line-clamp-3"
            dangerouslySetInnerHTML={{ 
              __html: project.metadata.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...' 
            }}
          />
        )}
        
        {technologies && (
          <div className="text-xs text-gray-500">
            <strong>Technologies:</strong> {technologies}
          </div>
        )}
        
        {completionDate && (
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            Completed {format(new Date(completionDate), 'MMM yyyy')}
          </div>
        )}
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Demo
            </a>
          )}
          
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs text-gray-600 hover:text-gray-700 transition-colors"
            >
              <Github className="h-3 w-3 mr-1" />
              Code
            </a>
          )}
        </div>
        
        <Link
          href={`/projects/${project.slug}`}
          className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
}