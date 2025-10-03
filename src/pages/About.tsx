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
      title: 'Innovation',
      description: 'We constantly push the boundaries of technology to deliver cutting-edge solutions.'
    },
    {
      icon: UserGroupIcon,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and building strong partnerships with our clients.'
    },
    {
      icon: TrophyIcon,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from code quality to customer service.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Impact',
      description: 'We build solutions that make a real difference in our clients\' businesses and communities.'
    }
  ];

  const milestones = [
    { year: '2019', title: 'Company Founded', description: 'Undash-cop was established with a vision to transform businesses through technology.' },
    { year: '2020', title: 'First Major Client', description: 'Secured our first enterprise client and delivered a comprehensive analytics platform.' },
    { year: '2021', title: 'Team Expansion', description: 'Grew our team to 20+ professionals and opened our Bangalore office.' },
    { year: '2022', title: 'Product Launch', description: 'Launched our flagship AI platform and reached 100+ active clients.' },
    { year: '2023', title: 'International Expansion', description: 'Expanded operations to 5 countries and achieved ISO 27001 certification.' },
    { year: '2024', title: 'Future Ready', description: 'Continuing to innovate with next-generation technologies and solutions.' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Undash-cop
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We are a technology company dedicated to empowering businesses with innovative 
              solutions that drive growth, efficiency, and transformation.
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
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <LightBulbIcon className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To democratize technology and make advanced digital solutions accessible 
                  to businesses of all sizes. We believe that every organization deserves 
                  access to cutting-edge technology that can transform their operations 
                  and drive sustainable growth.
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrophyIcon className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To be the leading technology partner for businesses worldwide, known for 
                  our innovation, reliability, and commitment to client success. We envision 
                  a future where technology seamlessly integrates with business processes 
                  to create unprecedented value and opportunities.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape our company culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small startup to a trusted technology partner, here's our story.
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
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
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
      <section ref={teamRef} className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 ${
              teamVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
              Meet Our <span className="text-gradient">Team</span>
            </h2>
            <p className={`text-lg md:text-xl text-gray-600 max-w-3xl mx-auto ${
              teamVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`} style={{ animationDelay: '0.2s' }}>
              The talented individuals behind our success, dedicated to delivering 
              exceptional results for our clients.
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
                    className="w-20 h-20 rounded-2xl mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 w-20 h-20 rounded-2xl mx-auto bg-primary-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3 text-sm">
                  {member.position}
                </p>
                <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join the growing number of businesses that trust Undash-cop for their 
            technology needs. Let's build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
            >
              Get in Touch
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </a>
            <a
              href="/careers"
              className="border border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
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
