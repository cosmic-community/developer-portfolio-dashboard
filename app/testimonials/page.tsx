import Link from 'next/link'
import { ArrowLeft, Plus, MessageSquare, Star, User } from 'lucide-react'
import { getTestimonials } from '@/lib/cosmic'
import TestimonialCard from '@/components/TestimonialCard'

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <div className="h-6 border-l border-gray-300" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
                <p className="text-gray-600">{testimonials.length} client testimonials</p>
              </div>
            </div>
            
            <Link
              href="/testimonials/new"
              className="btn-primary"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Testimonial
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {testimonials.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No testimonials yet</h3>
              <p className="text-gray-600 mb-6">Start showcasing client feedback by adding your first testimonial.</p>
              <Link
                href="/testimonials/new"
                className="btn-primary"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Your First Testimonial
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}