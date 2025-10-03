import { Link } from 'react-router-dom';
import { ArrowLeftIcon, QuestionMarkCircleIcon, ChatBubbleLeftRightIcon, PhoneIcon, EnvelopeIcon, DocumentTextIcon, ExclamationTriangleIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import companyData from '../data/companyData';

const Support = () => {
  const faqs = [
    {
      question: "How do I get started with your services?",
      answer: "Getting started is easy! Simply contact us through our contact form or call us directly. We'll schedule a consultation to understand your needs and provide a customized solution."
    },
    {
      question: "What types of software development services do you offer?",
      answer: "We offer comprehensive software development services including web applications, mobile apps, custom software solutions, system integration, cloud computing, and technical consulting."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity and requirements. Simple websites may take 2-4 weeks, while complex enterprise solutions can take 3-6 months. We provide detailed timelines during the consultation phase."
    },
    {
      question: "Do you provide ongoing support and maintenance?",
      answer: "Yes! We offer comprehensive support and maintenance packages including bug fixes, updates, security patches, performance monitoring, and technical support."
    },
    {
      question: "What technologies do you work with?",
      answer: "We work with a wide range of technologies including React, Node.js, Python, Java, .NET, AWS, Azure, Docker, Kubernetes, and many more modern frameworks and tools."
    },
    {
      question: "How do you ensure data security?",
      answer: "We implement industry-standard security measures including SSL encryption, secure coding practices, regular security audits, access controls, and compliance with data protection regulations."
    },
    {
      question: "Can you work with our existing systems?",
      answer: "Absolutely! We specialize in system integration and can work with your existing infrastructure, databases, and third-party services to ensure seamless integration."
    },
    {
      question: "What is your pricing model?",
      answer: "We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Pricing depends on project scope, complexity, and timeline requirements."
    }
  ];

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
    <div className="bg-gray-50 py-16">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-primary-600 transition-colors duration-200">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Support</span>
        </nav>

        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors duration-200"
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help! Find answers to common questions, get technical support, or contact our team directly.
          </p>
        </div>

        {/* Quick Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <PhoneIcon className="h-8 w-8 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Speak directly with our support team</p>
            <a 
              href={`tel:${companyData.address.phoneno}`}
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              {companyData.address.phoneno}
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <EnvelopeIcon className="h-8 w-8 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">Send us a detailed message</p>
            <a 
              href={`mailto:${companyData.address.email}`}
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              {companyData.address.email}
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Chat with our support team</p>
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">How Can We Help You?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div 
                  key={index}
                  className={`${category.bgColor} ${category.borderColor} border rounded-lg p-6 hover:shadow-md transition-shadow duration-200`}
                >
                  <IconComponent className={`h-8 w-8 ${category.color} mb-4`} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                      <h3 className="text-lg font-medium text-gray-900 pr-4">{faq.question}</h3>
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Response Times */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Response Times</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <ClockIcon className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Critical Issues</h3>
              <p className="text-gray-600">Within 2 hours</p>
              <p className="text-sm text-gray-500 mt-1">System down, security issues</p>
            </div>
            <div className="text-center">
              <ClockIcon className="h-8 w-8 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">High Priority</h3>
              <p className="text-gray-600">Within 24 hours</p>
              <p className="text-sm text-gray-500 mt-1">Feature requests, bugs</p>
            </div>
            <div className="text-center">
              <ClockIcon className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">General Inquiries</h3>
              <p className="text-gray-600">Within 48 hours</p>
              <p className="text-sm text-gray-500 mt-1">Questions, information</p>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-primary-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Business Hours</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Hours</h3>
              <div className="space-y-2 text-gray-700">
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Support</h3>
              <p className="text-gray-700 mb-4">
                For critical issues outside business hours, please call our emergency line or send an urgent email.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Emergency Phone:</strong> {companyData.address.phoneno}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Emergency Email:</strong> {companyData.address.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Still Need Help?</h2>
          <div className="text-center">
            <p className="text-gray-700 mb-6">
              Can't find what you're looking for? Our support team is ready to help you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                Contact Support
              </Link>
              <a 
                href={`mailto:${companyData.address.email}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 font-medium rounded-lg border border-primary-600 hover:bg-primary-50 transition-colors duration-200"
              >
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
