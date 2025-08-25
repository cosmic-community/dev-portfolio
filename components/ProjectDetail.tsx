import type { Project } from '@/types'
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const imageUrl = project.metadata?.image?.imgix_url
  const name = project.metadata?.name || project.title
  const description = project.metadata?.description || ''
  const technologies = project.metadata?.technologies || ''
  const liveUrl = project.metadata?.live_url
  const githubUrl = project.metadata?.github_url

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden max-w-4xl mx-auto">
      {/* Project Header */}
      <div className="px-8 py-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {name}
            </h1>
            {project.metadata?.featured && (
              <span className="inline-block bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured Project
              </span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                Live Demo
              </a>
            )}
            
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <CodeBracketIcon className="w-5 h-5" />
                View Code
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Project Image */}
      {imageUrl && (
        <div className="relative">
          <img
            src={`${imageUrl}?w=1200&h=600&fit=crop&auto=format,compress`}
            alt={name}
            className="w-full h-64 md:h-96 object-cover"
            width={800}
            height={400}
          />
        </div>
      )}

      {/* Project Content */}
      <div className="px-8 py-8">
        {/* Description */}
        {description && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Project</h2>
            <div className="prose prose-lg text-gray-700 max-w-none">
              {description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        {technologies && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {technologies.split(',').map((tech, index) => (
                <span
                  key={index}
                  className="inline-block bg-primary-50 text-primary-700 px-4 py-2 rounded-lg font-medium"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Project Links */}
        <div className="pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Links</h2>
          <div className="flex flex-wrap gap-4">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                Visit Live Site
              </a>
            )}
            
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                <CodeBracketIcon className="w-5 h-5" />
                View Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}