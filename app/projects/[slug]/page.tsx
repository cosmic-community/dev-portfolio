// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProject, getProjects } from '@/lib/cosmic'
import ProjectDetail from '@/components/ProjectDetail'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all projects
export async function generateStaticParams() {
  try {
    const projects = await getProjects()
    return projects.map((project) => ({
      slug: project.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Generate metadata for the project page
export async function generateMetadata({ params }: PageProps) {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params
  
  try {
    const project = await getProject(slug)
    
    if (!project) {
      return {
        title: 'Project Not Found',
        description: 'The requested project could not be found.',
      }
    }

    return {
      title: `${project.metadata?.name || project.title} | Developer Portfolio`,
      description: project.metadata?.description || 'View this project details and technologies used.',
      openGraph: {
        title: project.metadata?.name || project.title,
        description: project.metadata?.description,
        images: project.metadata?.image?.imgix_url ? [{
          url: `${project.metadata.image.imgix_url}?w=1200&h=630&fit=crop&auto=format`,
          width: 1200,
          height: 630,
          alt: project.metadata?.name || project.title,
        }] : [],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Project | Developer Portfolio',
      description: 'View project details and technologies used.',
    }
  }
}

export default async function ProjectPage({ params }: PageProps) {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params
  
  try {
    const project = await getProject(slug)
    
    if (!project) {
      notFound()
    }

    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container section-padding">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Projects
            </Link>
          </div>

          <ProjectDetail project={project} />
        </div>
      </main>
    )
  } catch (error) {
    console.error('Error loading project:', error)
    notFound()
  }
}