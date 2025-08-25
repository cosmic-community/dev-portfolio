import type { Testimonial } from '@/types'
import { getStarRating } from '@/lib/cosmic'
import { StarIcon } from '@heroicons/react/24/solid'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const name = testimonial.metadata?.name || ''
  const title = testimonial.metadata?.title || ''
  const company = testimonial.metadata?.company || ''
  const testimonialText = testimonial.metadata?.testimonial || ''
  const ratingKey = testimonial.metadata?.rating?.key || '5'
  const photoUrl = testimonial.metadata?.photo?.imgix_url
  
  const rating = getStarRating(ratingKey)

  return (
    <div className="card h-full flex flex-col">
      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400' : 'text-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <blockquote className="text-gray-700 mb-6 flex-1 leading-relaxed">
        "{testimonialText}"
      </blockquote>

      {/* Client Info */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        {photoUrl && (
          <img
            src={`${photoUrl}?w=120&h=120&fit=crop&auto=format,compress`}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
            width={48}
            height={48}
          />
        )}
        
        <div className="flex-1">
          <p className="font-medium text-gray-900">{name}</p>
          {title && company && (
            <p className="text-sm text-gray-500">{title} at {company}</p>
          )}
          {title && !company && (
            <p className="text-sm text-gray-500">{title}</p>
          )}
          {!title && company && (
            <p className="text-sm text-gray-500">{company}</p>
          )}
        </div>
      </div>
    </div>
  )
}