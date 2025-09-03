import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Projects API
export async function getProjects(): Promise<import('@/types').Project[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    
    return response.objects.sort((a, b) => {
      const dateA = new Date(a.metadata?.completion_date || a.created_at).getTime();
      const dateB = new Date(b.metadata?.completion_date || b.created_at).getTime();
      return dateB - dateA;
    }) as import('@/types').Project[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch projects');
  }
}

// Skills API
export async function getSkills(): Promise<import('@/types').Skill[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'skills' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    
    return response.objects as import('@/types').Skill[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch skills');
  }
}

// Work Experience API
export async function getWorkExperience(): Promise<import('@/types').WorkExperience[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'work-experience' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    
    return response.objects.sort((a, b) => {
      const dateA = new Date(a.metadata?.start_date || a.created_at).getTime();
      const dateB = new Date(b.metadata?.start_date || b.created_at).getTime();
      return dateB - dateA;
    }) as import('@/types').WorkExperience[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch work experience');
  }
}

// Testimonials API
export async function getTestimonials(): Promise<import('@/types').Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    
    return response.objects.sort((a, b) => {
      const dateA = new Date(a.metadata?.date_received || a.created_at).getTime();
      const dateB = new Date(b.metadata?.date_received || b.created_at).getTime();
      return dateB - dateA;
    }) as import('@/types').Testimonial[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch testimonials');
  }
}

// Update object
export async function updateObject(id: string, data: any) {
  try {
    const response = await cosmic.objects.updateOne(id, data);
    return response.object;
  } catch (error) {
    console.error('Error updating object:', error);
    throw new Error('Failed to update object');
  }
}

// Delete object
export async function deleteObject(id: string) {
  try {
    await cosmic.objects.deleteOne(id);
  } catch (error) {
    console.error('Error deleting object:', error);
    throw new Error('Failed to delete object');
  }
}

// Create object
export async function createObject(data: any) {
  try {
    const response = await cosmic.objects.insertOne(data);
    return response.object;
  } catch (error) {
    console.error('Error creating object:', error);
    throw new Error('Failed to create object');
  }
}