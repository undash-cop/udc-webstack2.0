import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import companyData from '../data/companyData';
import jobOpeningsData from '../data/jobOpeningsData';
import { 
  MapPinIcon, 
  ClockIcon, 
  BriefcaseIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  TrophyIcon,
  ChartBarIcon,
  SparklesIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';

const Careers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const jobOpenings = jobOpeningsData;

  // Filter jobs based on search and filters
  const filteredJobs = jobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation;
    const matchesType = selectedType === 'All' || job.type === selectedType;
    
    return matchesSearch && matchesDepartment && matchesLocation && matchesType;
  });

  const departments = ['All', ...Array.from(new Set(jobOpenings.map(job => job.department)))];
  const locations = ['All', ...Array.from(new Set(jobOpenings.map(job => job.location)))];
  const types = ['All', ...Array.from(new Set(jobOpenings.map(job => job.type)))];

  const benefits = companyData.benefits.map((benefit: { title: string; description: string }, index: number) => ({
    icon: [HeartIcon, AcademicCapIcon, BriefcaseIcon, CheckCircleIcon][index % 4],
    title: benefit.title,
    description: benefit.description
  }));

  const culture = [
    'Engineering-first environment',
    'Collaborative team culture',
    'Inclusive workplace',
    'Clear communication and feedback',
    'Work-life balance',
    'Continuous learning',
    'Stable, meaningful projects',
    'Team events and activities'
  ];

  const employeeTestimonials = [
    {
      name: 'Priya Sharma',
      role: 'Senior Software Engineer',
      department: 'Engineering',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&auto=format',
      quote: 'Working at Undash-cop has been a solid experience. The team is supportive, the projects are meaningful, and I\'ve grown in my career.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Product Manager',
      department: 'Product',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format',
      quote: 'The culture is strong. People care about what they do, and there\'s room to learn. Work-life balance is respected.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'UI/UX Designer',
      department: 'Design',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format',
      quote: 'Good creative freedom and collaboration. The design team is strong, and we push each other to do better work.',
      rating: 5
    }
  ];

  const careerPaths = [
    {
      title: 'Engineering Track',
      description: 'From Junior Developer to Tech Lead',
      levels: ['Junior Developer', 'Mid-level Developer', 'Senior Developer', 'Tech Lead', 'Engineering Manager'],
      icon: CodeBracketIcon
    },
    {
      title: 'Product Track',
      description: 'From Associate PM to VP of Product',
      levels: ['Associate PM', 'Product Manager', 'Senior PM', 'Principal PM', 'VP of Product'],
      icon: ChartBarIcon
    },
    {
      title: 'Design Track',
      description: 'From Junior Designer to Design Director',
      levels: ['Junior Designer', 'Mid-level Designer', 'Senior Designer', 'Lead Designer', 'Design Director'],
      icon: SparklesIcon
    },
    {
      title: 'Sales Track',
      description: 'From SDR to VP of Sales',
      levels: ['SDR', 'Account Executive', 'Senior AE', 'Sales Manager', 'VP of Sales'],
      icon: TrophyIcon
    }
  ];

  const featuredJobs = filteredJobs.filter(job => job.featured);
  const regularJobs = filteredJobs.filter(job => !job.featured);

  // Navigation handlers
  const handleApplyNow = (job: { id: number }) => {
    navigate(`/apply/${job.id}`);
  };

  const handleViewDetails = (job: { id: number }) => {
    navigate(`/job/${job.id}`);
  };

  const handleSendResume = () => {
    navigate('/send-resume');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom text-center">
          <h1 className="text-display md:text-display-lg font-semibold text-neutral-900 mb-6">
            Join Our Team
          </h1>
          <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto mb-8">
            Join a team that builds software, cloud, and products with AI as a core capability for startups and founders. 
            Proven delivery. Engineering-first culture.
          </p>
          
          {/* Search and Filter Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="card p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search jobs by title, skills, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <FunnelIcon className="w-5 h-5 mr-2" />
                  Filters
                </button>
              </div>
              
              {/* Filter Options */}
              {showFilters && (
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Department</label>
                      <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Location</label>
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {locations.map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Job Type</label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {types.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedDepartment('All');
                        setSelectedLocation('All');
                        setSelectedType('All');
                      }}
                      className="text-neutral-600 hover:text-neutral-800 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#openings" className="btn-primary btn-lg inline-flex items-center justify-center">
              View Open Positions ({filteredJobs.length})
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </a>
            <a href="#culture" className="btn-outline btn-lg inline-flex items-center justify-center">
              Our Culture
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section-lg mb-4">
              Why Work With Us?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We operate with consistent execution and engineering maturity. A stable environment 
              where you can grow, learn, and contribute as a long-term partner—not an early-stage sprint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit: { icon: React.ComponentType<{ className?: string }>; title: string; description: string }, index: number) => (
              <Card key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-neutral-600">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section id="culture" className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-section-lg mb-6">
                Our Culture
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                At Undash-cop, we believe strong products come from strong teams. 
                We focus on collaboration, learning, and steady delivery so everyone 
                can contribute effectively.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {culture.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <span className="text-neutral-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="card p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">Team Happiness</h3>
                    <div className="text-4xl font-bold text-primary-600 mb-2">4.8/5</div>
                    <p className="text-neutral-600">Team satisfaction</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-700">Work-Life Balance</span>
                      <div className="w-32 bg-neutral-200 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full w-4/5"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-700">Career Growth</span>
                      <div className="w-32 bg-neutral-200 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full w-5/6"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-700">Team Collaboration</span>
                      <div className="w-32 bg-neutral-200 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full w-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-700">Learning Opportunities</span>
                      <div className="w-32 bg-neutral-200 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full w-4/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Employee Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section-lg mb-4">
              What Our Team Says
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Hear from our team about working at Undash-cop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {employeeTestimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-neutral-600 mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                    <div className="text-sm text-neutral-600">{testimonial.role}</div>
                    <div className="text-xs text-primary-600">{testimonial.department}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Growth Paths */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section-lg mb-4">
              Career Growth Paths
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We believe in investing in our people. Here are the career paths available at Undash-cop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {careerPaths.map((path, index) => (
              <Card key={index} className="p-6 text-center group hover:shadow-soft-lg transition-all duration-300">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                  <path.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{path.title}</h3>
                <p className="text-neutral-600 mb-4">{path.description}</p>
                <div className="space-y-2">
                  {path.levels.map((level, levelIndex) => (
                    <div
                      key={levelIndex}
                      className={`text-sm px-3 py-1 rounded-full ${
                        levelIndex === 0
                          ? 'bg-green-100 text-green-800'
                          : levelIndex === path.levels.length - 1
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {level}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section-lg mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Find your next career opportunity with us. We're always looking for 
              talented individuals to join our growing team.
            </p>
          </div>

          {/* Featured Jobs */}
          {featuredJobs.length > 0 && (
            <div className="mb-12">
              <h3 className="heading-section mb-6">Featured Positions</h3>
              <div className="space-y-4">
                {featuredJobs.map((job) => (
                  <Card key={job.id} className="p-6 group border border-primary-200 hover:border-primary-300 transition-shadow duration-250 hover:shadow-soft-lg relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-50 to-transparent rounded-full -translate-y-12 translate-x-12 opacity-40"></div>
                    
                    <div className="relative">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        {/* Left Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="heading-section group-hover:text-primary-600 transition-colors mb-0">
                                {job.title}
                              </h4>
                              <div className="flex space-x-2">
                                <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                                  Featured
                                </span>
                                {job.urgent && (
                                  <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md animate-pulse">
                                    Urgent
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary-600 mb-1">{job.salary}</div>
                              <div className="text-sm text-neutral-500">Posted {job.posted}</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 mb-4">
                            <div className="flex items-center text-neutral-600 bg-neutral-50 rounded-lg px-3 py-2">
                              <BriefcaseIcon className="w-4 h-4 mr-2 text-primary-600" />
                              <span className="font-medium">{job.department}</span>
                            </div>
                            <div className="flex items-center text-neutral-600 bg-neutral-50 rounded-lg px-3 py-2">
                              <MapPinIcon className="w-4 h-4 mr-2 text-primary-600" />
                              <span className="font-medium">{job.location}</span>
                            </div>
                            <div className="flex items-center text-neutral-600 bg-neutral-50 rounded-lg px-3 py-2">
                              <ClockIcon className="w-4 h-4 mr-2 text-primary-600" />
                              <span className="font-medium">{job.type}</span>
                            </div>
                            <div className="flex items-center text-neutral-600 bg-neutral-50 rounded-lg px-3 py-2">
                              <AcademicCapIcon className="w-4 h-4 mr-2 text-primary-600" />
                              <span className="font-medium">{job.experience}</span>
                            </div>
                          </div>
                          
                          <p className="text-neutral-600 mb-4 leading-relaxed">
                            {job.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, index) => (
                              <span key={index} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Right Actions */}
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto lg:min-w-[200px]">
                          <button 
                            onClick={() => handleApplyNow(job)}
                            className="btn-apply w-full sm:flex-1 lg:flex-none text-sm py-3 flex items-center justify-center"
                          >
                            Apply Now
                            <ArrowRightIcon className="w-4 h-4 ml-2" />
                          </button>
                          <div className="flex gap-2 w-full sm:w-auto lg:w-full">
                            <button 
                              onClick={() => handleViewDetails(job)}
                              className="btn-details flex-1 text-sm py-2 flex items-center justify-center"
                            >
                              View Details
                              <ArrowRightIcon className="w-4 h-4 ml-1" />
                            </button>
                            <button 
                              className="btn-save px-4 py-2 flex items-center justify-center"
                              aria-label="Save job"
                            >
                              <HeartIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Regular Jobs */}
          <div className="space-y-4">
            {regularJobs.map((job) => (
              <Card key={job.id} className="p-6 group hover:shadow-soft-lg transition-all duration-300 border border-neutral-200 hover:border-primary-200 relative overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Left Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors mb-2">
                          {job.title}
                        </h4>
                        <div className="text-2xl font-bold text-primary-600 mb-2">{job.salary}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full inline-block">
                          Posted {job.posted}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center text-neutral-600 bg-neutral-50 rounded-lg px-3 py-2">
                        <BriefcaseIcon className="w-4 h-4 mr-2 text-primary-600" />
                        <span className="font-medium">{job.department}</span>
                      </div>
                      <div className="flex items-center text-neutral-600 bg-neutral-50 rounded-lg px-3 py-2">
                        <MapPinIcon className="w-4 h-4 mr-2 text-primary-600" />
                        <span className="font-medium">{job.location}</span>
                      </div>
                      <div className="flex items-center text-neutral-600 bg-neutral-50 rounded-lg px-3 py-2">
                        <ClockIcon className="w-4 h-4 mr-2 text-primary-600" />
                        <span className="font-medium">{job.type}</span>
                      </div>
                      <div className="flex items-center text-neutral-600 bg-neutral-50 rounded-lg px-3 py-2">
                        <AcademicCapIcon className="w-4 h-4 mr-2 text-primary-600" />
                        <span className="font-medium">{job.experience}</span>
                      </div>
                    </div>
                    
                    <p className="text-neutral-600 mb-4 leading-relaxed">
                      {job.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 6).map((skill, index) => (
                        <span key={index} className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 6 && (
                        <span className="text-neutral-500 text-sm px-3 py-1">
                          +{job.skills.length - 6} more skills
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Right Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto lg:min-w-[200px]">
                    <button 
                      onClick={() => handleApplyNow(job)}
                      className="btn-apply w-full sm:flex-1 lg:flex-none text-sm py-3 flex items-center justify-center"
                    >
                      Apply Now
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </button>
                    <div className="flex gap-2 w-full sm:w-auto lg:w-full">
                      <button 
                        onClick={() => handleViewDetails(job)}
                        className="btn-details flex-1 text-sm py-2 flex items-center justify-center"
                      >
                        View Details
                        <ArrowRightIcon className="w-4 h-4 ml-1" />
                      </button>
                      <button 
                        className="btn-save px-4 py-2 flex items-center justify-center"
                        aria-label="Save job"
                      >
                        <HeartIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* No Openings Message */}
          {jobOpenings.length === 0 && (
            <Card className="text-center py-12">
              <BriefcaseIcon className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">No Open Positions</h3>
              <p className="text-neutral-600 mb-6">
                We don't have any open positions at the moment, but we're always interested 
                in hearing from talented individuals.
              </p>
              <a href="/contact" className="btn-primary">
                Send Us Your Resume
              </a>
            </Card>
          )}
        </div>
      </section>

      {/* Application Process */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section-lg mb-4">
              Our Application Process
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We've designed a simple and transparent process to help you join our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Apply Online</h3>
              <p className="text-neutral-600 text-sm">Submit your application with resume and cover letter</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Initial Review</h3>
              <p className="text-neutral-600 text-sm">Our team reviews your application within 3-5 business days</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Interviews</h3>
              <p className="text-neutral-600 text-sm">Technical and cultural fit interviews with the team</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Decision</h3>
              <p className="text-neutral-600 text-sm">We make our decision and extend an offer if it's a good fit</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="heading-section text-white mb-0">
            Don't See the Right Role?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            We're always open to hearing from strong candidates. Send your resume and 
            we'll keep you in mind for future roles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleSendResume}
              className="btn-secondary btn-lg inline-flex items-center justify-center"
          >
            Send Your Resume
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
            <a
              href="/about"
              className="btn-outline-light btn-lg inline-flex items-center justify-center"
            >
              Learn More About Us
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
