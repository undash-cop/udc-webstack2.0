import { Link } from 'react-router-dom';
import { ArrowLeftIcon, Cog6ToothIcon, InformationCircleIcon, ShieldCheckIcon, EyeIcon, CalendarDaysIcon, EnvelopeIcon, ExclamationTriangleIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import companyData from '../data/companyData';

const CookiePolicy = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-primary-600 transition-colors duration-200">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Cookie Policy</span>
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

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
              <Cog6ToothIcon className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This policy explains how we use cookies and similar technologies on our website to enhance your experience and provide our services.
            </p>
            <div className="mt-6 text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          {/* Content Sections */}
          <div className="prose prose-lg max-w-none">
            <div className="grid gap-8">
              {/* Introduction */}
              <section className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <InformationCircleIcon className="h-6 w-6 text-primary-600 mr-3" />
                  What Are Cookies?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing how you use our site, and enabling certain functionality.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This Cookie Policy explains what cookies we use, why we use them, and how you can control them. By continuing to use our website, you consent to our use of cookies as described in this policy.
                </p>
              </section>

              {/* Types of Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Cog6ToothIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Types of Cookies We Use
                </h2>
                <div className="space-y-6">
                  <div className="bg-green-50 border-l-4 border-green-400 p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                      Essential Cookies
                    </h3>
                    <p className="text-gray-700 mb-3">
                      These cookies are necessary for the website to function properly and cannot be disabled.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      <li>Session management and security</li>
                      <li>Load balancing and performance</li>
                      <li>Remembering your login status</li>
                      <li>Shopping cart functionality</li>
                      <li>Form data preservation</li>
                    </ul>
                    <div className="mt-3 p-3 bg-white rounded border">
                      <p className="text-sm text-gray-600">
                        <strong>Legal Basis:</strong> Legitimate interest (necessary for service provision)
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <EyeIcon className="h-5 w-5 text-blue-600 mr-2" />
                      Analytics Cookies
                    </h3>
                    <p className="text-gray-700 mb-3">
                      These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      <li>Google Analytics (anonymized IP addresses)</li>
                      <li>Page views and user behavior tracking</li>
                      <li>Traffic sources and referral data</li>
                      <li>Device and browser information</li>
                      <li>Performance metrics and error tracking</li>
                    </ul>
                    <div className="mt-3 p-3 bg-white rounded border">
                      <p className="text-sm text-gray-600">
                        <strong>Legal Basis:</strong> Consent (you can opt-out at any time)
                      </p>
                    </div>
                  </div>

                  <div className="bg-purple-50 border-l-4 border-purple-400 p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <ShieldCheckIcon className="h-5 w-5 text-purple-600 mr-2" />
                      Functional Cookies
                    </h3>
                    <p className="text-gray-700 mb-3">
                      These cookies enable enhanced functionality and personalization, such as remembering your preferences.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      <li>Language and region preferences</li>
                      <li>Theme and display settings</li>
                      <li>User interface customizations</li>
                      <li>Remembering form inputs</li>
                      <li>Accessibility settings</li>
                    </ul>
                    <div className="mt-3 p-3 bg-white rounded border">
                      <p className="text-sm text-gray-600">
                        <strong>Legal Basis:</strong> Consent (you can opt-out at any time)
                      </p>
                    </div>
                  </div>

                  <div className="bg-orange-50 border-l-4 border-orange-400 p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <Cog6ToothIcon className="h-5 w-5 text-orange-600 mr-2" />
                      Marketing Cookies
                    </h3>
                    <p className="text-gray-700 mb-3">
                      These cookies are used to deliver advertisements more relevant to you and your interests.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      <li>Social media integration</li>
                      <li>Advertising platform tracking</li>
                      <li>Remarketing and retargeting</li>
                      <li>Conversion tracking</li>
                      <li>Audience building and segmentation</li>
                    </ul>
                    <div className="mt-3 p-3 bg-white rounded border">
                      <p className="text-sm text-gray-600">
                        <strong>Legal Basis:</strong> Consent (you can opt-out at any time)
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Specific Cookies Used */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <InformationCircleIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Specific Cookies We Use
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cookie Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">_session_id</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Maintains user session</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Essential</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Session</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">_ga</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Google Analytics - distinguishes users</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Analytics</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2 years</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">_gid</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Google Analytics - distinguishes users</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Analytics</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">24 hours</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">_gat</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Google Analytics - throttles request rate</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Analytics</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">1 minute</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">cookie_consent</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Remembers cookie preferences</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Functional</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">1 year</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">language_pref</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Stores language preference</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Functional</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">1 year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Third-Party Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <ExclamationTriangleIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Third-Party Cookies
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Some cookies on our website are set by third-party services that appear on our pages. We have no control over these cookies.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Google Analytics</h3>
                      <p className="text-gray-700 text-sm mb-3">
                        We use Google Analytics to analyze website usage. Google may set cookies to track your activity.
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                        <li>Purpose: Website analytics and performance</li>
                        <li>Data collected: Anonymized usage data</li>
                        <li>Privacy policy: <a href="https://policies.google.com/privacy" className="text-primary-600 hover:text-primary-700 underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
                        <li>Opt-out: <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary-600 hover:text-primary-700 underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Social Media</h3>
                      <p className="text-gray-700 text-sm mb-3">
                        Social media platforms may set cookies when you interact with social features on our site.
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                        <li>Facebook, Twitter, LinkedIn, Instagram</li>
                        <li>Purpose: Social media integration</li>
                        <li>Data collected: Social interaction data</li>
                        <li>Control: Manage through social media settings</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Cookie Management */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <ShieldCheckIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Managing Your Cookie Preferences
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Cookie Consent Banner</h3>
                    <p className="text-gray-700 mb-3">
                      When you first visit our website, you'll see a cookie consent banner. You can:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Accept all cookies for the full experience</li>
                      <li>Reject non-essential cookies</li>
                      <li>Customize your preferences by category</li>
                      <li>Change your settings at any time</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Browser Settings</h3>
                    <p className="text-gray-700 mb-3">
                      You can also control cookies through your browser settings. Most browsers allow you to:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      <li>Block all cookies</li>
                      <li>Block third-party cookies only</li>
                      <li>Delete existing cookies</li>
                      <li>Set up notifications when cookies are set</li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Browser-Specific Instructions</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</p>
                        <p><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</p>
                        <p><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</p>
                        <p><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Mobile Devices</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>iOS Safari:</strong> Settings → Safari → Privacy & Security</p>
                        <p><strong>Android Chrome:</strong> Settings → Site settings → Cookies</p>
                        <p><strong>General:</strong> Check your device's privacy settings</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Impact of Disabling Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <XCircleIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Impact of Disabling Cookies
                </h2>
                <div className="space-y-4">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Essential Cookies</h3>
                    <p className="text-gray-700 text-sm">
                      If you disable essential cookies, some features of our website may not work properly, including:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm mt-2">
                      <li>User authentication and login</li>
                      <li>Shopping cart functionality</li>
                      <li>Form submissions</li>
                      <li>Security features</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Non-Essential Cookies</h3>
                    <p className="text-gray-700 text-sm">
                      Disabling non-essential cookies may result in:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm mt-2">
                      <li>Less personalized experience</li>
                      <li>Repeated preference settings</li>
                      <li>Inability to use certain features</li>
                      <li>Less relevant advertisements</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Data Protection */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <ShieldCheckIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Data Protection and Privacy
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    We are committed to protecting your privacy and ensuring the security of any data collected through cookies. 
                    For detailed information about how we handle your personal data, please see our 
                    <Link to="/privacy-policy" className="text-primary-600 hover:text-primary-700 underline ml-1">Privacy Policy</Link>.
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Key Privacy Principles</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                      <li>We only collect data necessary for the stated purpose</li>
                      <li>Cookie data is anonymized where possible</li>
                      <li>We do not sell cookie data to third parties</li>
                      <li>You can withdraw consent at any time</li>
                      <li>We implement appropriate security measures</li>
                      <li>Data is retained only as long as necessary</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Updates to Policy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CalendarDaysIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Updates to This Policy
                </h2>
                <p className="text-gray-700 mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, 
                  legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on this page 
                  and updating the "Last updated" date.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 text-sm">
                    <strong>Notification:</strong> Significant changes will be communicated through our website or via email 
                    to registered users. We encourage you to review this policy periodically.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section className="bg-primary-50 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <EnvelopeIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Contact Us
                </h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <strong>Data Protection Officer:</strong> {companyData.address.email}
                  </p>
                  <p className="text-gray-700">
                    <strong>General Inquiries:</strong> {companyData.address.email}
                  </p>
                  <p className="text-gray-700">
                    <strong>Phone:</strong> {companyData.address.phoneno}
                  </p>
                  <p className="text-gray-700">
                    <strong>Address:</strong> {companyData.address.headQuarters}
                  </p>
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Cookie Preferences:</strong> You can manage your cookie preferences at any time by clicking the 
                    "Cookie Settings" link in our website footer or by contacting us directly.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;