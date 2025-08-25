// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Project interface
export interface Project extends CosmicObject {
  type: 'projects';
  metadata: {
    name: string;
    description: string;
    technologies?: string;
    image?: {
      url: string;
      imgix_url: string;
    };
    live_url?: string;
    github_url?: string;
    featured?: boolean;
  };
}

// Skill interface
export interface Skill extends CosmicObject {
  type: 'skills';
  metadata: {
    name: string;
    category?: {
      key: SkillCategory;
      value: string;
    };
    proficiency?: {
      key: ProficiencyLevel;
      value: string;
    };
  };
}

// Work Experience interface
export interface WorkExperience extends CosmicObject {
  type: 'work-experience';
  metadata: {
    title: string;
    company: string;
    start_date: string;
    end_date?: string | null;
    current?: boolean;
    description?: string;
    technologies?: string;
  };
}

// Testimonial interface
export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    name: string;
    title?: string;
    company?: string;
    testimonial: string;
    rating?: {
      key: string;
      value: string;
    };
    photo?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Type literals for select-dropdown values
export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools' | 'other';
export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type Rating = '3' | '4' | '5';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isProject(obj: CosmicObject): obj is Project {
  return obj.type === 'projects';
}

export function isSkill(obj: CosmicObject): obj is Skill {
  return obj.type === 'skills';
}

export function isWorkExperience(obj: CosmicObject): obj is WorkExperience {
  return obj.type === 'work-experience';
}

export function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type === 'testimonials';
}

// Component prop types
export interface ProjectCardProps {
  project: Project;
  className?: string;
}

export interface SkillBadgeProps {
  skill: Skill;
  showProficiency?: boolean;
}

export interface WorkExperienceItemProps {
  experience: WorkExperience;
  className?: string;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}