import { createBucketClient } from '@cosmicjs/sdk'
import type { Project, Skill, WorkExperience, Testimonial, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper for handling Cosmic API errors
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all projects
export async function getProjects(): Promise<Project[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as Project[]).sort((a, b) => {
      // Featured projects first, then by creation date
      if (a.metadata?.featured && !b.metadata?.featured) return -1;
      if (!a.metadata?.featured && b.metadata?.featured) return 1;
      
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA; // Newest first
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
}

// Fetch featured projects
export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await getProjects();
    return projects.filter(project => project.metadata?.featured === true);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

// Fetch project by slug
export async function getProject(slug: string): Promise<Project | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'projects', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    if (!response.object) {
      return null;
    }
    
    return response.object as Project;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching project:', error);
    throw new Error('Failed to fetch project');
  }
}

// Fetch all skills organized by category
export async function getSkillsByCategory(): Promise<Record<string, Skill[]>> {
  try {
    const response = await cosmic.objects
      .find({ type: 'skills' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const skills = response.objects as Skill[];
    const skillsByCategory: Record<string, Skill[]> = {};
    
    skills.forEach(skill => {
      const category = skill.metadata?.category?.key || 'other';
      if (!skillsByCategory[category]) {
        skillsByCategory[category] = [];
      }
      skillsByCategory[category].push(skill);
    });
    
    return skillsByCategory;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return {};
    }
    console.error('Error fetching skills:', error);
    throw new Error('Failed to fetch skills');
  }
}

// Fetch all work experience
export async function getWorkExperience(): Promise<WorkExperience[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'work-experience' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as WorkExperience[]).sort((a, b) => {
      // Current positions first, then by start date (newest first)
      if (a.metadata?.current && !b.metadata?.current) return -1;
      if (!a.metadata?.current && b.metadata?.current) return 1;
      
      const dateA = new Date(a.metadata?.start_date || '').getTime();
      const dateB = new Date(b.metadata?.start_date || '').getTime();
      return dateB - dateA; // Newest first
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching work experience:', error);
    throw new Error('Failed to fetch work experience');
  }
}

// Fetch all testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as Testimonial[]).sort((a, b) => {
      // Sort by rating (highest first), then by creation date
      const ratingA = parseInt(a.metadata?.rating?.key || '0');
      const ratingB = parseInt(b.metadata?.rating?.key || '0');
      
      if (ratingA !== ratingB) {
        return ratingB - ratingA; // Highest rating first
      }
      
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA; // Newest first
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching testimonials:', error);
    throw new Error('Failed to fetch testimonials');
  }
}

// Utility function to get star rating from rating key
export function getStarRating(ratingKey: string): number {
  const rating = parseInt(ratingKey);
  return isNaN(rating) ? 5 : rating;
}

// Utility function to format date range
export function formatDateRange(startDate: string, endDate?: string | null, current?: boolean): string {
  const start = new Date(startDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });
  
  if (current) {
    return `${start} - Present`;
  }
  
  if (!endDate) {
    return `${start} - Present`;
  }
  
  const end = new Date(endDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });
  
  return `${start} - ${end}`;
}