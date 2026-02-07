import Card from '../components/Card';
import useScrollAnimation from '../hooks/useScrollAnimation';
import companyData from '../data/companyData';
import { 
  UserGroupIcon, 
  LightBulbIcon, 
  TrophyIcon,
  GlobeAltIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const About = () => {
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation();
  
  const team = companyData.members.map(member => ({
    name: member.name,
    position: member.title,
    image: member.photo || '/api/placeholder/300/300',
    bio: member.about,
    linkedin: member.linkedin
  }));

  const values = [
    {
      icon: LightBulbIcon,
      title: 'Engineering maturity',
      description: 'Technical depth and domain expertise. We ship with consistent execution, not hype.'
    },
    {
      icon: UserGroupIcon,
      title: 'Long-term partnership',
      description: 'We act as a technology partner, not a one-off vendor. Relationships that last.'
    },
    {
      icon: TrophyIcon,
      title: 'Consistent execution',
      description: 'Code quality, on-time delivery, and support that stays with you. Proven track record.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Domain expertise',
      description: 'We understand software, cloud, and automation at depth. Solutions that fit and scale.'
    }
  ];

  const milestones = [
    { year: '2019', title: 'Company founded', description: 'Undash-cop started with a focus on software and automation for startups.' },
    { year: '2020', title: 'First major client', description: 'Delivered a comprehensive analytics platform for an enterprise client.' },
    { year: '2021', title: 'Team expansion', description: 'Grew the team and opened our Bangalore development office.' },
    { year: '2022', title: 'AI in production', description: 'Launched products with AI built in for reliability and speed; scaled to 100+ active clients.' },
    { year: '2023', title: 'Broader reach', description: 'Expanded operations and achieved ISO 27001 certification.' },
    { year: '2024', title: 'Steady growth', description: 'Continuing to build software, cloud, and products with AI as a core capability for startups and founders.' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-display md:text-display-lg font-semibold text-neutral-900 mb-6">
              About Undash-cop
            </h1>
            <p className="text-body-lg text-neutral-600 leading-relaxed">
              We deliver with consistent execution, engineering maturity, and domain expertise. Undash-cop is a long-term technology partner—stable, not early-stage. Built for clients who value reliability and depth.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <LightBulbIcon className="w-6 h-6 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">Our Mission</h2>
                <p className="text-body text-neutral-600 leading-relaxed">
                  To deliver with proven, consistent execution. We combine engineering maturity 
                  and domain expertise so startups and growing businesses have a technology partner 
                  they can rely on over the long term—not a vendor, a partner.
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <TrophyIcon className="w-6 h-6 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">Our Vision</h2>
                <p className="text-body text-neutral-600 leading-relaxed">
                  To be the long-term technology partner for startups and growing businesses—known 
                  for consistent execution, engineering maturity, and domain expertise. We build 
                  relationships that last and systems that scale with our clients.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section-lg mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              These principles reflect how we operate—stability, depth, and long-term partnership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-600">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section-lg mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              A track record of consistent execution—engineering maturity and domain expertise over time.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="p-6">
                      <div className="text-primary-600 font-bold text-lg mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-neutral-600">
                        {milestone.description}
                      </p>
                    </Card>
                  </div>
                  <div className="w-8 h-8 bg-primary-600 rounded-full border-4 border-white shadow-lg flex-shrink-0 z-10"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className={`heading-section-lg mb-6 ${
              teamVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
              Meet Our <span className="text-gradient">Team</span>
            </h2>
            <p className={`text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto ${
              teamVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`} style={{ animationDelay: '0.2s' }}>
              Experienced leadership and teams—engineering maturity and domain expertise across product and operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className={`feature-card group p-6 text-center ${
                  teamVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-xl mx-auto object-cover transition-shadow duration-250"
                  />
                  <div className="absolute inset-0 w-20 h-20 rounded-xl mx-auto bg-primary-600/0 group-hover:bg-primary-600/10 transition-colors duration-250 flex items-center justify-center">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ArrowRightIcon className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3 text-sm">
                  {member.position}
                </p>
                <p className="text-neutral-600 text-xs leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="heading-section text-white mb-0">
            Looking for a Long-Term Technology Partner?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            We deliver with consistent execution and engineering maturity. Get in touch to discuss 
            how we can work together over the long term.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn-secondary btn-lg inline-flex items-center justify-center"
            >
              Get in Touch
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </a>
            <a
              href="/careers"
              className="btn-outline-light btn-lg inline-flex items-center justify-center"
            >
              Join Our Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
