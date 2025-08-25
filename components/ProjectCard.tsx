import Link from 'next/link'
import type { Project } from '@/types'
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const imageUrl = project.metadata?.image?.imgix_url
  const name = project.metadata?.name || project.title
  const description = project.metadata?.description || ''
  const technologies = project.metadata?.technologies || ''
  const liveUrl = project.metadata?.live_url
  const githubUrl = project.metadata?.github_url

  return (
    <div className={`card group ${featured ? 'border-primary-200 shadow-lg' : ''} overflow-hidden`}>
      {/* Project Image */}
      {imageUrl && (
        <div className="relative mb-6 -mx-6 -mt-6 overflow-hidden">
          <img
            src={`${imageUrl}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            width={400}
            height={240}
          />
          {featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </span>
            </div>
          )}
        </div>
      )}

      {/* Project Content */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
          {name}
        </h3>
        
        {description && (
          <p className="text-gray-600 line-clamp-3">
            {description}
          </p>
        )}

        {/* Technologies */}
        {technologies && (
          <div className="flex flex-wrap gap-2">
            {technologies.split(',').slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {tech.trim()}
              </span>
            ))}
            {technologies.split(',').length > 4 && (
              <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                +{technologies.split(',').length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Action Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          <Link
            href={`/projects/${project.slug}`}
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
          >
            View Details
          </Link>
          
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              Live Demo
            </a>
          )}
          
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <CodeBracketIcon className="w-4 h-4" />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  )
}