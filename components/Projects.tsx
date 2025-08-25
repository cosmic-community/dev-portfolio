import type { Project } from '@/types'
import ProjectCard from './ProjectCard'

interface ProjectsProps {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No projects available at the moment.</p>
      </div>
    )
  }

  const featuredProjects = projects.filter(project => project.metadata?.featured === true)
  const otherProjects = projects.filter(project => project.metadata?.featured !== true)

  return (
    <div className="space-y-12">
      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Featured Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>
        </div>
      )}

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <div>
          {featuredProjects.length > 0 && (
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Other Projects</h3>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}