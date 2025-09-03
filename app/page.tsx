import Link from 'next/link'
import { BarChart3, Briefcase, Code, MessageSquare, Star, User } from 'lucide-react'
import { getProjects, getSkills, getWorkExperience, getTestimonials } from '@/lib/cosmic'
import type { DashboardStats } from '@/types'

async function getDashboardStats(): Promise<DashboardStats> {
  const [projects, skills, experience, testimonials] = await Promise.all([
    getProjects(),
    getSkills(), 
    getWorkExperience(),
    getTestimonials()
  ])
  
  return {
    totalProjects: projects.length,
    totalSkills: skills.length,
    totalExperience: experience.length,
    totalTestimonials: testimonials.length,
    featuredProjects: projects.filter(p => p.metadata?.featured).length
  }
}

export default async function DashboardHome() {
  const stats = await getDashboardStats()
  
  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: Code,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      href: '/projects'
    },
    {
      title: 'Skills',
      value: stats.totalSkills,
      icon: Star,
      color: 'text-green-600', 
      bgColor: 'bg-green-50',
      href: '/skills'
    },
    {
      title: 'Work Experience',
      value: stats.totalExperience,
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50', 
      href: '/experience'
    },
    {
      title: 'Testimonials',
      value: stats.totalTestimonials,
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      href: '/testimonials'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <BarChart3 className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Developer Portfolio Dashboard</h1>
              <p className="text-gray-600">Manage your portfolio content and track your professional journey</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => {
            const IconComponent = stat.icon
            return (
              <Link
                key={stat.title}
                href={stat.href}
                className="card hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/projects/new"
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors group"
              >
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Code className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Add New Project</p>
                  <p className="text-sm text-gray-600">Showcase your latest work</p>
                </div>
              </Link>
              
              <Link
                href="/skills/new"
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors group"
              >
                <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                  <Star className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Add New Skill</p>
                  <p className="text-sm text-gray-600">Update your expertise</p>
                </div>
              </Link>
              
              <Link
                href="/experience/new"
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors group"
              >
                <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                  <Briefcase className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Add Work Experience</p>
                  <p className="text-sm text-gray-600">Record your career journey</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Portfolio Overview */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Featured Projects</span>
                <span className="text-lg font-bold text-primary-600">{stats.featuredProjects}</span>
              </div>
              
              <div className="text-sm text-gray-600 space-y-2">
                <p>• Manage your professional portfolio content</p>
                <p>• Track skills and experience</p>
                <p>• Showcase client testimonials</p>
                <p>• Monitor your career progress</p>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/analytics"
                  className="btn-primary w-full justify-center"
                >
                  View Analytics
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Projects', icon: Code, href: '/projects', description: 'Manage portfolio projects' },
            { title: 'Skills', icon: Star, href: '/skills', description: 'Update technical skills' },
            { title: 'Experience', icon: Briefcase, href: '/experience', description: 'Track work history' },
            { title: 'Testimonials', icon: MessageSquare, href: '/testimonials', description: 'Client feedback' }
          ].map((item) => {
            const IconComponent = item.icon
            return (
              <Link
                key={item.title}
                href={item.href}
                className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all group"
              >
                <div className="text-center">
                  <div className="inline-flex p-3 bg-gray-50 rounded-lg mb-4 group-hover:bg-primary-50 transition-colors">
                    <IconComponent className="h-6 w-6 text-gray-600 group-hover:text-primary-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}