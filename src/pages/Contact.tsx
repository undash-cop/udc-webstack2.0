import { useState } from 'react';
import HubSpotForm from '../components/HubSpotForm';
import Card from '../components/Card';
import { useToast } from '../contexts/ToastContext';
import companyData from '../data/companyData.js';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { success } = useToast();


  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: 'Email Us',
      details: [companyData.address.email],
      description: 'We respond within 24 hours'
    },
    {
      icon: PhoneIcon,
      title: 'Call Us',
      details: [companyData.address.phoneno],
      description: 'Available during business hours'
    },
    {
      icon: MapPinIcon,
      title: 'Headquarters',
      details: [companyData.address.headQuarters],
      description: 'Main office in Hoskote, Karnataka'
    },
    {
      icon: MapPinIcon,
      title: 'Development Office',
      details: [companyData.address.devOffice],
      description: 'Development center in Bengaluru'
    }
  ];


  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <Card className="text-center max-w-md animate-scale-in">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="heading-section mb-2">Thank You!</h2>
          <p className="text-neutral-600 mb-4">
            Your message has been sent successfully. We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="btn-primary"
          >
            Send Another Message
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom text-center">
          <h1 className="text-display md:text-display-lg font-semibold text-neutral-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto">
            Proven delivery. AI built into our products—used in production for reliability, speed, and outcomes. Work with our experts—get in touch to discuss your needs.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="heading-section mb-4">
                  Send us a Message
                </h2>
                <p className="text-neutral-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>
              
              <Card className="p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Send us a Message
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                <HubSpotForm
                  formId={companyData.hs_form_contact.contactFormId}
                  portalId={companyData.hs_form_contact.portalId}
                  onFormSubmitted={() => {
                    setIsSubmitted(true);
                    success('Message Sent!', 'We\'ll get back to you within 24 hours.');
                    setTimeout(() => {
                      setIsSubmitted(false);
                    }, 5000);
                  }}
                  className="w-full"
                />

                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <p className="text-sm text-neutral-600 text-center">
                    Having trouble? Contact us directly at{' '}
                    <a 
                      href={`mailto:${companyData.address.email}`}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      {companyData.address.email}
                    </a>
                  </p>
                </div>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="heading-section mb-6">
                  Contact Information
                </h2>
                <p className="text-neutral-600 mb-8">
                  We're here to help! Choose the most convenient way to reach us.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                          {info.title}
                        </h3>
                        <div className="space-y-1 mb-2">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-neutral-700 font-medium">
                              {detail}
                            </p>
                          ))}
                        </div>
                        <p className="text-neutral-600 text-sm">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="heading-section mb-4">
              Find Us
            </h2>
            <p className="text-neutral-600">
              Our offices in Karnataka
            </p>
          </div>
          
          {/* Headquarters Map */}
          <div className="mb-12">
            <div className="card overflow-hidden">
              <div className="p-6 border-b border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2 flex items-center">
                  <MapPinIcon className="w-6 h-6 text-primary-600 mr-2" />
                  Headquarters
                </h3>
                <p className="text-neutral-600 text-sm">
                  {companyData.address.headQuarters}
                </p>
              </div>
              <div className="h-96">
                <iframe
                  src={companyData.address.mapLink}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Undash-cop Headquarters Location"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Development Office Map */}
          <div>
          <div className="card overflow-hidden">
              <div className="p-6 border-b border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2 flex items-center">
                  <MapPinIcon className="w-6 h-6 text-primary-600 mr-2" />
                  Development Office
                </h3>
                <p className="text-neutral-600 text-sm">
                  {companyData.address.devOffice}
                </p>
              </div>
              <div className="h-96">
              
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.614679956308!2d77.69306677507691!3d12.996479187321203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae110b3c1ae257%3A0x338aab3b907ba3d6!2sThe%20Hive%20-%20Flexible%20Workspaces%2C%20VR%20Bengaluru!5e0!3m2!1sen!2sin!4v1759492998310!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Hive at VR Bengaluru - Development Office Location"
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 bg-neutral-50 border-t border-neutral-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-neutral-600">
                    <span className="font-medium">The Hive at VR Bengaluru</span>
                    <br />
                    <span>Level 5, 60/2, ITPL Main Rd, Devasandra Industrial Estate</span>
                    <br />
                    <span>Mahadevapura, Bengaluru, Karnataka 560048</span>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=The+Hive+at+VR+Bengaluru+60%2F2+ITPL+Main+Rd+Devasandra+Industrial+Estate+Mahadevapura+Bengaluru+Karnataka+560048"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center text-sm"
                  >
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-neutral-600">
              Common questions about our services
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How quickly can you start a new project?",
                answer: "We typically begin new projects within 1-2 weeks of contract signing, depending on our current workload and project complexity."
              },
              {
                question: "Do you provide ongoing support after project completion?",
                answer: "Yes, we offer comprehensive post-launch support including maintenance, updates, and technical assistance."
              },
              {
                question: "What technologies do you specialize in?",
                answer: "We work with modern technologies including React, Node.js, Python, AWS, Azure, and various databases and frameworks."
              },
              {
                question: "Do you work with international clients?",
                answer: "Absolutely! We have experience working with clients across different time zones and can accommodate various communication preferences."
              },
              {
                question: "What is your typical project timeline?",
                answer: "Project timelines vary based on scope and complexity, but most projects range from 2-6 months for development and deployment."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-neutral-600">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
