import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { 
  ArrowLeftIcon, 
  QuestionMarkCircleIcon, 
  ChatBubbleLeftRightIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  DocumentTextIcon, 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import companyData from '../data/companyData';

const Support = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const faqCategories = [
    { id: 'All', name: 'All Questions', count: 0 },
    { id: 'General', name: 'General', count: 0 },
    { id: 'Technical', name: 'Technical Support', count: 0 },
    { id: 'Account', name: 'Account & Security', count: 0 },
    { id: 'Integration', name: 'Integrations', count: 0 }
  ];

  const faqData = [
    {
      id: 1,
      category: 'General',
      question: 'What services does Undash-cop provide?',
      answer: 'Undash-cop provides software, cloud, and automation solutions including custom development, web and mobile apps, cloud services, and automation. AI is a core capability across many of our products—used in production to improve reliability, speed, and outcomes.'
    },
    {
      id: 2,
      category: 'General',
      question: 'How long has Undash-cop been in business?',
      answer: 'Undash-cop has a proven track record providing software, cloud, and automation solutions. We have completed hundreds of projects for startups and growing businesses.'
    },
    {
      id: 3,
      category: 'General',
      question: 'What industries do you serve?',
      answer: 'We serve a wide range of industries including healthcare, finance, e-commerce, manufacturing, education, real estate, and more. Our team has extensive experience across different sectors and can adapt our solutions to meet industry-specific requirements and compliance standards.'
    },
    {
      id: 4,
      category: 'General',
      question: 'How do you price your services?',
      answer: 'Our pricing is based on project scope, complexity, timeline, and specific requirements. We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Contact us for a detailed quote tailored to your specific needs.'
    },
    {
      id: 5,
      category: 'General',
      question: 'Do you offer free consultations?',
      answer: 'Yes, we offer free initial consultations to discuss your project requirements, understand your goals, and provide preliminary recommendations. This helps us provide accurate estimates and ensures we\'re the right fit for your project.'
    },
    {
      id: 6,
      category: 'Technical',
      question: 'What technologies do you work with?',
      answer: 'We work with a wide range of modern technologies including React, Vue.js, Angular, Node.js, Python, PHP, Java, .NET, AWS, Azure, Google Cloud, Docker, Kubernetes, and many more. We stay current with modern technologies to deliver stable, reliable solutions.'
    },
    {
      id: 7,
      category: 'Technical',
      question: 'Do you provide ongoing support and maintenance?',
      answer: 'Yes, we offer comprehensive support and maintenance services including bug fixes, updates, security patches, performance optimization, and feature enhancements. We provide different support tiers to meet your specific needs and budget.'
    },
    {
      id: 8,
      category: 'Technical',
      question: 'How do you ensure code quality and security?',
      answer: 'We follow industry best practices including code reviews, automated testing, security audits, and adherence to coding standards. Our development process includes regular quality checks, security assessments, and performance optimization to ensure robust and secure applications.'
    },
    {
      id: 9,
      category: 'Technical',
      question: 'Do you provide hosting and deployment services?',
      answer: 'Yes, we offer hosting and deployment services using reliable cloud platforms like AWS, Azure, and Google Cloud. We handle server setup, configuration, monitoring, and maintenance to ensure your application runs smoothly and securely.'
    },
    {
      id: 10,
      category: 'Account',
      question: 'How do I get started with a project?',
      answer: 'Getting started is easy! Simply contact us through our website, email, or phone. We\'ll schedule a free consultation to discuss your requirements, provide recommendations, and create a detailed project plan with timeline and pricing.'
    },
    {
      id: 11,
      category: 'Account',
      question: 'Can I track my project progress?',
      answer: 'Absolutely! We provide regular project updates through our client portal, where you can track progress, view milestones, communicate with the team, and access project documentation. We also schedule regular check-in meetings to keep you informed.'
    },
    {
      id: 12,
      category: 'Account',
      question: 'What if I need changes during development?',
      answer: 'We understand that requirements can evolve during development. We have a flexible change management process that allows for modifications while keeping the project on track. Changes are evaluated for impact on timeline and budget, and we\'ll discuss options with you before implementation.'
    },
    {
      id: 13,
      category: 'Integration',
      question: 'Do you integrate with third-party services?',
      answer: 'Yes, we have extensive experience integrating with various third-party services including payment gateways, CRM systems, email marketing platforms, analytics tools, social media APIs, and many more. We can help you connect your application with the services you need.'
    },
    {
      id: 14,
      category: 'Integration',
      question: 'Can you migrate data from our existing system?',
      answer: 'Yes, we provide data migration services to help you transition from legacy systems to new platforms. We ensure data integrity, perform thorough testing, and provide a smooth migration process with minimal downtime.'
    },
    {
      id: 15,
      category: 'General',
      question: 'What is your response time for support requests?',
      answer: 'We aim to respond to all support requests within 24 hours during business days. For critical issues, we provide priority support with faster response times. Our support team is available Monday through Friday, 9 AM to 6 PM.'
    }
  ];

  // Calculate category counts
  faqCategories.forEach(category => {
    if (category.id === 'All') {
      category.count = faqData.length;
    } else {
      category.count = faqData.filter(item => item.category === category.id).length;
    }
  });

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const supportCategories = [
    {
      title: "Technical Support",
      description: "Get help with technical issues, bug reports, and system problems",
      icon: ExclamationTriangleIcon,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      title: "Account & Billing",
      description: "Manage your account, billing questions, and payment issues",
      icon: DocumentTextIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Feature Requests",
      description: "Suggest new features or improvements to our services",
      icon: CheckCircleIcon,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "General Inquiries",
      description: "Questions about our services, pricing, or general information",
      icon: QuestionMarkCircleIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <>
      <SEOHead
        title="Support - Help & Technical Support | Undash-cop"
        description="Technical support, FAQs, and contact. We're here to help with software, cloud, and automation."
        keywords="support, technical support, FAQ, contact, software, cloud"
        canonicalUrl="https://undash-cop.com/support"
      />
      <div className="bg-neutral-50 section-padding">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-neutral-600 mb-8">
          <Link to="/" className="hover:text-primary-600 active:text-primary-700 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary-300/60 focus:ring-offset-2 focus:ring-offset-white rounded-sm">Home</Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium">Support</span>
        </nav>

        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 active:text-primary-800 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary-300/60 focus:ring-offset-2 focus:ring-offset-white rounded-sm"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
            <QuestionMarkCircleIcon className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="heading-page">Support Center</h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Find answers to common questions, get technical support, or contact our team.
          </p>
        </div>

        {/* Quick Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6 text-center">
            <PhoneIcon className="h-8 w-8 text-primary-600 mx-auto mb-4" />
            <h3 className="heading-card mb-2">Call Us</h3>
            <p className="text-neutral-600 mb-4">Available during business hours</p>
            <a 
              href={`tel:${companyData.address.phoneno}`}
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              {companyData.address.phoneno}
            </a>
          </div>

          <div className="card p-6 text-center">
            <EnvelopeIcon className="h-8 w-8 text-primary-600 mx-auto mb-4" />
            <h3 className="heading-card mb-2">Email Us</h3>
            <p className="text-neutral-600 mb-4">We respond within 24 hours</p>
            <a 
              href={`mailto:${companyData.address.email}`}
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              {companyData.address.email}
            </a>
          </div>

          <div className="card p-6 text-center">
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-primary-600 mx-auto mb-4" />
            <h3 className="heading-card mb-2">Live Chat</h3>
            <p className="text-neutral-600 mb-4">Contact us via the form</p>
            <Link 
              to="/contact"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              Start Chat
            </Link>
          </div>
        </div>

        {/* Support Categories */}
        <div className="mb-12">
          <h2 className="heading-section text-center">How Can We Help You?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div 
                  key={index}
                  className={`${category.bgColor} ${category.borderColor} border rounded-lg p-6 hover:shadow-md transition-shadow duration-200`}
                >
                  <IconComponent className={`h-8 w-8 ${category.color} mb-4`} />
                  <h3 className="heading-card mb-2">{category.title}</h3>
                  <p className="text-neutral-600 text-sm">{category.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="heading-section">Frequently Asked Questions</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Common questions about our services, pricing, and support.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative mb-6">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary-400/60 focus:ring-offset-2 focus:ring-offset-white active:scale-[0.98] ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 hover:bg-primary-650 active:bg-primary-700 text-white shadow-soft'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-150 active:bg-neutral-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-12">
                  <QuestionMarkCircleIcon className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">No FAQs found</h3>
                  <p className="text-neutral-600">Try adjusting your search or category filter.</p>
                </div>
              ) : (
                filteredFAQs.map((faq) => (
                  <div key={faq.id} className="card">
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 active:bg-neutral-100 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary-300/60 focus:ring-offset-2 focus:ring-offset-white rounded-xl"
                    >
                      <div className="flex-1 pr-4">
                        <h3 className="text-lg font-medium text-neutral-900 mb-1">{faq.question}</h3>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                          {faq.category}
                        </span>
                      </div>
                      <div className="flex-shrink-0">
                        {openItems.includes(faq.id) ? (
                          <ChevronUpIcon className="h-5 w-5 text-neutral-500" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5 text-neutral-500" />
                        )}
                      </div>
                    </button>
                    {openItems.includes(faq.id) && (
                      <div className="px-6 pb-6 border-t border-neutral-100">
                        <p className="text-neutral-700 leading-relaxed pt-4">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Response Times */}
        <div className="card p-8 mb-12">
          <h2 className="heading-section text-center">Response Times</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <ClockIcon className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h3 className="heading-card mb-2">Critical Issues</h3>
              <p className="text-neutral-600">Within 2 hours</p>
              <p className="text-sm text-neutral-500 mt-1">System down, security issues</p>
            </div>
            <div className="text-center">
              <ClockIcon className="h-8 w-8 text-yellow-600 mx-auto mb-4" />
              <h3 className="heading-card mb-2">High Priority</h3>
              <p className="text-neutral-600">Within 24 hours</p>
              <p className="text-sm text-neutral-500 mt-1">Feature requests, bugs</p>
            </div>
            <div className="text-center">
              <ClockIcon className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="heading-card mb-2">General Inquiries</h3>
              <p className="text-neutral-600">Within 48 hours</p>
              <p className="text-sm text-neutral-500 mt-1">Questions, information</p>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-primary-50 rounded-lg p-8 mb-12">
          <h2 className="heading-section text-center">Business Hours</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Support Hours</h3>
              <div className="space-y-2 text-neutral-700">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Emergency Support</h3>
              <p className="text-neutral-700 mb-4">
                For critical issues outside business hours, please call our emergency line or send an urgent email.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-neutral-600">
                  <strong>Emergency Phone:</strong> {companyData.address.phoneno}
                </p>
                <p className="text-sm text-neutral-600">
                  <strong>Emergency Email:</strong> {companyData.address.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="card p-8">
          <h2 className="heading-section text-center">Still Need Help?</h2>
          <div className="text-center">
            <p className="text-neutral-700 mb-6">
              Can't find what you're looking for? Our support team is ready to help you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="btn-primary inline-flex items-center justify-center"
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                Contact Support
              </Link>
              <a 
                href={`mailto:${companyData.address.email}`}
                className="btn-outline inline-flex items-center justify-center"
              >
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Support;
