# Developer Portfolio Website

![Portfolio Preview](https://imgix.cosmicjs.com/7341e850-8202-11f0-b0ac-f12686cb9ade-photo-1556742049-0cfed4f6a45d-1756160748170.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive developer portfolio website built with Next.js 15 and Cosmic. Showcase your projects, skills, work experience, and client testimonials in a professional and engaging way.

## ✨ Features

- **Dynamic Project Showcase** - Interactive project gallery with filtering and detailed views
- **Professional Skills Matrix** - Organized by category with proficiency levels
- **Work Experience Timeline** - Chronological display of your career journey
- **Client Testimonials** - Star ratings and authentic client feedback
- **Responsive Design** - Optimized for all devices and screen sizes
- **SEO Optimized** - Meta tags and structured data for better search visibility
- **Fast Loading** - Optimized images and performance best practices
- **Modern UI** - Clean, professional design with smooth animations

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68ace25b04ea77b1e31e5675&clone_repository=68ace42304ea77b1e31e569b)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a web developer portfolio with projects, skills, work experience, and testimonials"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Frontend:** Next.js 15, React 18, TypeScript
- **Styling:** Tailwind CSS, CSS Grid, Flexbox
- **CMS:** Cosmic Headless CMS
- **Deployment:** Vercel, Netlify
- **Performance:** Image optimization with Imgix
- **SEO:** Next.js built-in SEO features

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket with your portfolio content

### Installation

1. **Clone the repository:**
   ```bash
   git clone [your-repo-url]
   cd developer-portfolio-website
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. **Run the development server:**
   ```bash
   bun dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000` to see your portfolio website.

## 📡 Cosmic SDK Examples

### Fetching Projects
```typescript
import { cosmic } from '@/lib/cosmic'

export async function getProjects() {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}
```

### Fetching Skills by Category
```typescript
export async function getSkillsByCategory() {
  try {
    const response = await cosmic.objects
      .find({ type: 'skills' })
      .props(['id', 'title', 'metadata'])
      .depth(1)
    
    const skills = response.objects
    const skillsByCategory: Record<string, Skill[]> = {}
    
    skills.forEach(skill => {
      const category = skill.metadata?.category?.key || 'other'
      if (!skillsByCategory[category]) {
        skillsByCategory[category] = []
      }
      skillsByCategory[category].push(skill)
    })
    
    return skillsByCategory
  } catch (error) {
    console.error('Error fetching skills:', error)
    return {}
  }
}
```

## 🎨 Cosmic CMS Integration

This portfolio website integrates with four main content types in your Cosmic bucket:

### Projects
- Project name, description, and technologies
- Project images with automatic optimization
- Live URLs and GitHub repository links
- Featured project designation

### Skills
- Skill categorization (Frontend, Backend, Database, Tools, Other)
- Proficiency levels (Beginner, Intermediate, Advanced, Expert)
- Organized display by category

### Work Experience
- Job titles, companies, and date ranges
- Current position indicators
- Detailed descriptions and key technologies
- Chronological timeline display

### Testimonials
- Client names, titles, and companies
- Testimonial text and star ratings
- Client photos with automatic image optimization
- Social proof for your services

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command to `bun run build`
3. Add environment variables in Netlify dashboard

### Environment Variables for Production
Make sure to add these environment variables in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

## 📱 Mobile Optimization

The portfolio is fully responsive and optimized for mobile devices with:
- Touch-friendly navigation
- Optimized images for different screen sizes
- Fast loading times on mobile networks
- Accessible design patterns

## 🔧 Customization

You can easily customize the portfolio by:
- Modifying the color scheme in `tailwind.config.js`
- Updating content directly in your Cosmic dashboard
- Adding new sections by creating additional content types
- Customizing the layout in the React components

<!-- README_END -->