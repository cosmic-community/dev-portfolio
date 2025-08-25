export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white section-padding">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Let's Work Together</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              I'm always interested in new opportunities and exciting projects. 
              Whether you need a full-stack developer or want to discuss your next idea, 
              let's connect!
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:your.email@example.com"
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <a href="#projects" className="block text-gray-300 hover:text-white transition-colors duration-200">
                Projects
              </a>
              <a href="#skills" className="block text-gray-300 hover:text-white transition-colors duration-200">
                Skills
              </a>
              <a href="#experience" className="block text-gray-300 hover:text-white transition-colors duration-200">
                Experience
              </a>
              <a href="#testimonials" className="block text-gray-300 hover:text-white transition-colors duration-200">
                Testimonials
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <p>your.email@example.com</p>
              <p>+1 (555) 123-4567</p>
              <p>Your City, Your Country</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Developer Portfolio. Built with Next.js and Cosmic.
          </p>
        </div>
      </div>
    </footer>
  )
}