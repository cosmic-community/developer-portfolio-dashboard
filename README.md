# Developer Portfolio Dashboard

![App Preview](https://imgix.cosmicjs.com/cf871ad0-88ed-11f0-bf37-852f320151c2-photo-1556742049-0cfed4f6a45d-1756921539611.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive React dashboard for managing your developer portfolio content including projects, skills, work experience, and testimonials. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Complete CRUD Operations** - Create, read, update, and delete all content types
- **Real-time Content Management** - Live updates for projects, skills, experience, and testimonials
- **Advanced Filtering & Search** - Filter by categories, skills, project types, and search across all content
- **Responsive Dashboard Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Data Tables** - Sortable columns, pagination, and bulk actions
- **Rich Content Editor** - Full HTML editing capabilities for descriptions
- **Type Safety** - Full TypeScript implementation with strict typing
- **Modern UI** - Clean, professional interface with Tailwind CSS

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68b87dfd66cccb5104c6fffe&clone_repository=68b8866d66cccb5104c70044)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a web developer portfolio with projects, skills, work experience, and testimonials"

### Code Generation Prompt

> "Create a React dashboard that displays and manages my existing content"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic CMS
- **Icons**: Lucide React
- **Package Manager**: Bun
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your portfolio content

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Cosmic credentials:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Projects
```typescript
import { cosmic } from '@/lib/cosmic'

const projects = await cosmic.objects
  .find({ type: 'projects' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Creating New Content
```typescript
const newProject = await cosmic.objects.insertOne({
  type: 'projects',
  title: 'My New Project',
  metadata: {
    project_name: 'My New Project',
    description: '<p>Project description here</p>',
    technologies: 'React, Next.js, TypeScript',
    project_type: { key: 'web_app', value: 'Web Application' }
  }
})
```

### Updating Content
```typescript
await cosmic.objects.updateOne(projectId, {
  metadata: {
    featured: true,
    completion_date: '2024-01-15'
  }
})
```

## Cosmic CMS Integration

This dashboard integrates with four main content types in your Cosmic bucket:

- **Projects** - Showcase your portfolio projects with images, descriptions, and technologies
- **Skills** - Manage your technical skills with categories and proficiency levels  
- **Work Experience** - Track your professional experience with companies and achievements
- **Testimonials** - Display client testimonials with ratings and project references

All content is managed through the Cosmic CMS API with full CRUD operations and real-time updates.

## Deployment

### Deploy on Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Set these in your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY` 
- `COSMIC_WRITE_KEY`

<!-- README_END -->