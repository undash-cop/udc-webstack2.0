import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { getCaseStudyById } from '../data/caseStudiesData';
import { 
  ArrowLeftIcon,
  HeartIcon,
  ShareIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  BuildingOfficeIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

const CaseStudyDetail = () => {
  const { id } = useParams();
  const [caseStudy, setCaseStudy] = useState<any>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const study = getCaseStudyById(id || '0');
    setCaseStudy(study || null);
  }, [id]);

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Case Study Not Found</h1>
          <Link to="/case-studies" className="text-primary-600 hover:text-primary-700">
            ← Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    // In a real app, this would update the database
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: caseStudy.title,
        text: caseStudy.challenge,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show a toast notification
    }
  };

  return (
    <div>
      <SEOHead
        title={`${caseStudy.title} - Case Study`}
        description={caseStudy.challenge}
        keywords={`${caseStudy.industry}, case study, ${caseStudy.technologies.join(', ')}, project showcase`}
      />

      {/* Back Button */}
      <div className="bg-gray-50 py-4">
        <div className="container-custom">
          <Link 
            to="/case-studies" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Case Studies
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {caseStudy.industry}
                </span>
                {caseStudy.featured && (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {caseStudy.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                {caseStudy.challenge}
              </p>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-gray-600">
                  <BuildingOfficeIcon className="h-5 w-5" />
                  <span className="font-medium">{caseStudy.client}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarIcon className="h-5 w-5" />
                  <span>{caseStudy.publishedDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    isLiked 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <HeartIcon className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  {caseStudy.likes + (isLiked ? 1 : 0)} Likes
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ShareIcon className="h-5 w-5" />
                  Share
                </button>
              </div>
            </div>

            <div className="relative">
              <img
                src={caseStudy.image}
                alt={caseStudy.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              {caseStudy.videoUrl && (
                <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg hover:bg-opacity-60 transition-all">
                  <PlayIcon className="h-16 w-16 text-white" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <div className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <ClockIcon className="h-6 w-6 text-primary-600" />
                <h3 className="text-lg font-semibold text-gray-900">Duration</h3>
              </div>
              <p className="text-gray-600">{caseStudy.duration}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <UserGroupIcon className="h-6 w-6 text-primary-600" />
                <h3 className="text-lg font-semibold text-gray-900">Team Size</h3>
              </div>
              <p className="text-gray-600">{caseStudy.teamSize}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <CurrencyDollarIcon className="h-6 w-6 text-primary-600" />
                <h3 className="text-lg font-semibold text-gray-900">Budget</h3>
              </div>
              <p className="text-gray-600">{caseStudy.budget}</p>
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Challenge</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Solution</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Results</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {caseStudy.results.map((result: string, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                  <CheckCircleIcon className="h-8 w-8 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium">{result}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technologies Used</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {caseStudy.technologies.map((tech: string, index: number) => (
                <span key={index} className="px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gray-50 p-12 rounded-lg mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <blockquote className="text-2xl text-gray-700 italic mb-8">
                "{caseStudy.testimonial.quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {caseStudy.testimonial.author.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900 text-lg">
                    {caseStudy.testimonial.author}
                  </div>
                  <div className="text-gray-600">
                    {caseStudy.testimonial.role}, {caseStudy.testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary-600 rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Let's discuss how we can help transform your business with innovative technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Your Project
              </Link>
              <Link
                to="/case-studies"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                View More Case Studies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;
