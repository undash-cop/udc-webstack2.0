import { useState, useEffect } from 'react';
import Card from './Card';
import { 
  StarIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  content: string;
  featured: boolean;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "CEO",
      company: "TechStart Inc.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      content: "Undash-cop transformed our business operations completely. Their automation solutions saved us 40 hours per week and increased our productivity by 300%. The team is professional, responsive, and truly understands our needs.",
      featured: true
    },
    {
      id: 2,
      name: "Arjun Patel",
      role: "CTO",
      company: "DataFlow Solutions",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      content: "The EUP Dashboard has been a game-changer for our HR and finance management. The interface is intuitive, and the reporting capabilities are exactly what we needed. Highly recommend their services.",
      featured: true
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Operations Manager",
      company: "GrowthCorp",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "Outstanding customer support and excellent products. The Serviso platform streamlined our business processes and helped us scale efficiently. The ROI was evident within the first month.",
      featured: true
    },
    {
      id: 4,
      name: "David Kim",
      role: "Founder",
      company: "InnovateLab",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "The team at Undash-cop delivered exactly what they promised. Their custom development solutions are top-notch, and they went above and beyond to ensure our project's success.",
      featured: false
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Finance Director",
      company: "ScaleUp Ventures",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "Futuro Expenses has revolutionized how we handle our financial tracking. The automation features are incredible, and the mobile app makes expense management so convenient.",
      featured: false
    },
    {
      id: 6,
      name: "James Wilson",
      role: "IT Director",
      company: "Enterprise Solutions",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "YRB Services provided exceptional IT support and infrastructure solutions. Their expertise and reliability have been crucial to our business operations. Highly professional team.",
      featured: false
    }
  ];

  const featuredTestimonials = testimonials.filter(t => t.featured);
  const regularTestimonials = testimonials.filter(t => !t.featured);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === featuredTestimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredTestimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === featuredTestimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredTestimonials.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with Undash-cop.
          </p>
        </div>

        {/* Featured Testimonials Carousel */}
        <div className="mb-16">
          <div className="relative max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 text-center relative overflow-hidden">
              <ChatBubbleLeftRightIcon className="w-16 h-16 text-primary-100 absolute top-4 left-4" />
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  {renderStars(featuredTestimonials[currentIndex]?.rating || 5)}
                </div>
                
                <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                  "{featuredTestimonials[currentIndex]?.content}"
                </blockquote>
                
                <div className="flex items-center justify-center">
                  <img
                    src={featuredTestimonials[currentIndex]?.image}
                    alt={featuredTestimonials[currentIndex]?.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">
                      {featuredTestimonials[currentIndex]?.name}
                    </div>
                    <div className="text-gray-600">
                      {featuredTestimonials[currentIndex]?.role}, {featuredTestimonials[currentIndex]?.company}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevTestimonial}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
              >
                <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
              </button>
              
              <button
                onClick={nextTestimonial}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
              >
                <ChevronRightIcon className="w-6 h-6 text-gray-600" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-8 space-x-3">
                {featuredTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                    className={`w-4 h-4 rounded-full transition-colors p-2 ${
                      index === currentIndex ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                    style={{ minWidth: '44px', minHeight: '44px' }}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Regular Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
              
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              <blockquote className="text-gray-700 italic">
                "{testimonial.content}"
              </blockquote>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">99%</div>
            <div className="text-gray-600">Customer Satisfaction</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
            <div className="text-gray-600">Support Available</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">5★</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
