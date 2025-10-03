import Card from '../components/Card';
import companyData from '../data/companyData';
import { 
  MapPinIcon, 
  ClockIcon, 
  BriefcaseIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const Careers = () => {
  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'We are looking for a passionate Senior Full Stack Developer to join our engineering team.',
      requirements: [
        '3+ years of experience with React and Node.js',
        'Strong knowledge of TypeScript and modern JavaScript',
        'Experience with cloud platforms (AWS/Azure)',
        'Familiarity with database design and optimization',
        'Excellent problem-solving and communication skills'
      ],
      posted: '2024-01-15',
      featured: true
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Join our design team to create beautiful and intuitive user experiences.',
      requirements: [
        '2+ years of UI/UX design experience',
        'Proficiency in Figma, Sketch, or Adobe Creative Suite',
        'Strong portfolio showcasing design skills',
        'Understanding of user research and testing',
        'Experience with design systems and component libraries'
      ],
      posted: '2024-01-12',
      featured: false
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Help us build and maintain our cloud infrastructure and deployment pipelines.',
      requirements: [
        '2+ years of DevOps experience',
        'Strong knowledge of AWS or Azure',
        'Experience with Docker and Kubernetes',
        'Familiarity with CI/CD pipelines',
        'Knowledge of monitoring and logging tools'
      ],
      posted: '2024-01-10',
      featured: false
    },
    {
      id: 4,
      title: 'Product Manager',
      department: 'Product',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '4-6 years',
      description: 'Lead product strategy and roadmap for our core platform solutions.',
      requirements: [
        '4+ years of product management experience',
        'Strong analytical and strategic thinking skills',
        'Experience with agile development methodologies',
        'Excellent communication and leadership skills',
        'Technical background preferred'
      ],
      posted: '2024-01-08',
      featured: false
    },
    {
      id: 5,
      title: 'Sales Engineer',
      department: 'Sales',
      location: 'Mumbai, India',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Bridge the gap between our technical solutions and client needs.',
      requirements: [
        '3+ years of sales engineering experience',
        'Strong technical background in software development',
        'Excellent presentation and communication skills',
        'Experience with enterprise sales cycles',
        'Ability to understand complex technical requirements'
      ],
      posted: '2024-01-05',
      featured: false
    },
    {
      id: 6,
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Drive our marketing strategy and brand awareness in the technology space.',
      requirements: [
        '3+ years of marketing experience in tech industry',
        'Strong digital marketing skills',
        'Experience with content marketing and SEO',
        'Analytical mindset with data-driven approach',
        'Excellent written and verbal communication'
      ],
      posted: '2024-01-03',
      featured: false
    }
  ];

  const benefits = companyData.benefits.map((benefit, index) => ({
    icon: [HeartIcon, AcademicCapIcon, BriefcaseIcon, CheckCircleIcon][index % 4],
    title: benefit.title,
    description: benefit.description
  }));

  const culture = [
    'Innovation-driven environment',
    'Collaborative team culture',
    'Diverse and inclusive workplace',
    'Open communication and feedback',
    'Work-life balance focus',
    'Continuous learning culture',
    'Impact-driven projects',
    'Fun team events and activities'
  ];

  const featuredJobs = jobOpenings.filter(job => job.featured);
  const regularJobs = jobOpenings.filter(job => !job.featured);

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Be part of a dynamic team that's building the future of technology. 
            We're looking for passionate individuals who want to make a real impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#openings" className="btn-primary">
              View Open Positions
            </a>
            <a href="#culture" className="btn-outline">
              Learn About Our Culture
            </a>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Work With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer more than just a job - we provide an environment where you can grow, 
              learn, and make a meaningful impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section id="culture" className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Culture
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                At Undash-cop, we believe that great products are built by great teams. 
                We foster a culture of innovation, collaboration, and continuous learning 
                where everyone can thrive and contribute to our mission.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {culture.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Happiness</h3>
                    <div className="text-4xl font-bold text-primary-600 mb-2">4.8/5</div>
                    <p className="text-gray-600">Employee satisfaction rating</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Work-Life Balance</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full w-4/5"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Career Growth</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full w-5/6"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Team Collaboration</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full w-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Learning Opportunities</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
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

      {/* Job Openings */}
      <section id="openings" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find your next career opportunity with us. We're always looking for 
              talented individuals to join our growing team.
            </p>
          </div>

          {/* Featured Jobs */}
          {featuredJobs.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Positions</h3>
              <div className="space-y-6">
                {featuredJobs.map((job) => (
                  <Card key={job.id} className="p-6 group">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h4 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                            {job.title}
                          </h4>
                          <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                            Featured
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <div className="flex items-center text-gray-600">
                            <BriefcaseIcon className="w-4 h-4 mr-2" />
                            {job.department}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPinIcon className="w-4 h-4 mr-2" />
                            {job.location}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <ClockIcon className="w-4 h-4 mr-2" />
                            {job.type}
                          </div>
                          <div className="text-gray-600">
                            {job.experience} experience
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">
                          {job.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.slice(0, 3).map((req, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              {req}
                            </span>
                          ))}
                          {job.requirements.length > 3 && (
                            <span className="text-gray-500 text-sm">
                              +{job.requirements.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        <button className="btn-primary w-full lg:w-auto">
                          Apply Now
                          <ArrowRightIcon className="w-4 h-4 ml-2" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Regular Jobs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regularJobs.map((job) => (
              <Card key={job.id} className="p-6 group">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {job.title}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {job.posted}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <BriefcaseIcon className="w-4 h-4 mr-2" />
                    {job.department}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    {job.type} • {job.experience}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">
                  {job.description}
                </p>
                
                <button className="btn-outline w-full">
                  View Details
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </button>
              </Card>
            ))}
          </div>

          {/* No Openings Message */}
          {jobOpenings.length === 0 && (
            <Card className="text-center py-12">
              <BriefcaseIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Open Positions</h3>
              <p className="text-gray-600 mb-6">
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

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Don't See the Right Role?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            We're always looking for exceptional talent. Send us your resume and 
            we'll keep you in mind for future opportunities.
          </p>
          <a
            href="/contact"
            className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center"
          >
            Send Your Resume
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Careers;
