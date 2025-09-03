// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Project object interface
export interface Project extends CosmicObject {
  type: 'projects';
  metadata: {
    project_name?: string;
    description?: string;
    technologies?: string;
    project_type?: {
      key: string;
      value: string;
    };
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    demo_url?: string;
    github_url?: string;
    completion_date?: string;
    featured?: boolean;
  };
}

// Skill object interface
export interface Skill extends CosmicObject {
  type: 'skills';
  metadata: {
    skill_name?: string;
    category?: {
      key: string;
      value: string;
    };
    proficiency?: {
      key: string;
      value: string;
    };
    years_experience?: number;
    description?: string;
  };
}

// Work Experience object interface
export interface WorkExperience extends CosmicObject {
  type: 'work-experience';
  metadata: {
    job_title?: string;
    company?: string;
    company_logo?: {
      url: string;
      imgix_url: string;
    };
    start_date?: string;
    end_date?: string;
    current_position?: boolean;
    location?: string;
    employment_type?: {
      key: string;
      value: string;
    };
    description?: string;
    achievements?: string;
  };
}

// Testimonial object interface
export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    client_name?: string;
    client_title?: string;
    company?: string;
    client_photo?: {
      url: string;
      imgix_url: string;
    };
    testimonial_text?: string;
    rating?: {
      key: string;
      value: string;
    };
    project?: Project;
    date_received?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type literals for select-dropdown values
export type ProjectType = 'web_app' | 'website' | 'mobile_app' | 'api';
export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools' | 'design';
export type SkillProficiency = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'freelance' | 'internship';
export type TestimonialRating = '5' | '4' | '3' | '2' | '1';

// Type guards for runtime validation
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

// Utility types for common patterns
export type CreateProjectData = Omit<Project, 'id' | 'created_at' | 'modified_at' | 'slug'>;
export type UpdateProjectData = Partial<Pick<Project, 'title' | 'metadata'>>;

// Dashboard specific types
export interface DashboardStats {
  totalProjects: number;
  totalSkills: number;
  totalExperience: number;
  totalTestimonials: number;
  featuredProjects: number;
}

export interface FilterOptions {
  category?: string;
  proficiency?: string;
  projectType?: string;
  featured?: boolean;
  search?: string;
}