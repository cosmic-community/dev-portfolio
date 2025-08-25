import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import WorkExperience from '@/components/WorkExperience'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import { getProjects, getSkillsByCategory, getWorkExperience, getTestimonials } from '@/lib/cosmic'

export default async function Home() {
  // Fetch all data in parallel
  const [projects, skillsByCategory, workExperience, testimonials] = await Promise.all([
    getProjects(),
    getSkillsByCategory(),
    getWorkExperience(),
    getTestimonials(),
  ])

  return (
    <main className="min-h-screen">
      <Hero />
      
      {/* Projects Section */}
      <section id="projects" className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and experience in web development.
            </p>
          </div>
          <Projects projects={projects} />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technical Skills
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              I have expertise in a wide range of technologies and tools for modern web development.
            </p>
          </div>
          <Skills skillsByCategory={skillsByCategory} />
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Work Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              My professional journey and the roles that have shaped my expertise.
            </p>
          </div>
          <WorkExperience experiences={workExperience} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Client Testimonials
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              What my clients say about working with me and the results we've achieved together.
            </p>
          </div>
          <Testimonials testimonials={testimonials} />
        </div>
      </section>

      <Footer />
    </main>
  )
}