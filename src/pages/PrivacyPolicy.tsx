import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ShieldCheckIcon, DocumentTextIcon, GlobeAltIcon, UserGroupIcon, CalendarDaysIcon, EnvelopeIcon, ExclamationTriangleIcon, EyeIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import companyData from '../data/companyData';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-primary-600 transition-colors duration-200">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Privacy Policy</span>
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
              <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information in compliance with GDPR, CCPA, and other applicable privacy laws.
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
                  <DocumentTextIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Introduction
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  At Undash-cop ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, 
                  or interact with us in any way.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This policy complies with the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), 
                  and other applicable privacy laws. By using our services, you consent to the data practices described in this policy.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <GlobeAltIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Information We Collect
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Personal Information</h3>
                    <p className="text-gray-700 mb-3">We may collect the following types of personal information:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li><strong>Identity Data:</strong> Name, title, date of birth, gender</li>
                      <li><strong>Contact Data:</strong> Email address, telephone numbers, postal address</li>
                      <li><strong>Professional Data:</strong> Job title, company name, industry, work experience</li>
                      <li><strong>Financial Data:</strong> Payment card details, billing address (processed securely through third-party providers)</li>
                      <li><strong>Technical Data:</strong> IP address, browser type, device information, operating system</li>
                      <li><strong>Usage Data:</strong> Information about how you use our website and services</li>
                      <li><strong>Marketing Data:</strong> Your preferences for receiving marketing communications</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Automatically Collected Information</h3>
                    <p className="text-gray-700">
                      We automatically collect certain information when you visit our website, including your IP address, 
                      browser type, pages visited, time spent on pages, referring website, and other usage statistics.
                    </p>
                  </div>
                </div>
              </section>

              {/* Legal Basis for Processing */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Cog6ToothIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Legal Basis for Processing (GDPR)
                </h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Consent</h3>
                    <p className="text-gray-700">When you provide explicit consent for specific processing activities, such as marketing communications.</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Contract Performance</h3>
                    <p className="text-gray-700">When processing is necessary to perform our contract with you or to take steps at your request before entering into a contract.</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Legitimate Interests</h3>
                    <p className="text-gray-700">When we have a legitimate business interest, such as improving our services, preventing fraud, or ensuring security.</p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Legal Obligation</h3>
                    <p className="text-gray-700">When we are required to process data to comply with legal obligations.</p>
                  </div>
                </div>
              </section>

              {/* How We Use Information */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <UserGroupIcon className="h-6 w-6 text-primary-600 mr-3" />
                  How We Use Your Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Service Provision</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Provide and maintain our services</li>
                      <li>Process transactions and payments</li>
                      <li>Deliver customer support</li>
                      <li>Manage your account</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Communication</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Send service-related communications</li>
                      <li>Respond to your inquiries</li>
                      <li>Send marketing materials (with consent)</li>
                      <li>Notify you of policy changes</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Improvement & Analytics</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Analyze usage patterns</li>
                      <li>Improve our website and services</li>
                      <li>Conduct research and development</li>
                      <li>Personalize user experience</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Legal & Security</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Comply with legal obligations</li>
                      <li>Protect against fraud and abuse</li>
                      <li>Ensure platform security</li>
                      <li>Enforce our terms of service</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Data Sharing */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <EyeIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Information Sharing and Disclosure
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li><strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating our website and providing services</li>
                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or safety</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                    <li><strong>Consent:</strong> When you have given explicit consent for specific sharing</li>
                    <li><strong>Emergency Situations:</strong> To protect the health and safety of individuals</li>
                  </ul>
                </div>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CalendarDaysIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Data Retention
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, 
                    unless a longer retention period is required or permitted by law.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Retention Periods</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li><strong>Account Data:</strong> Until account closure + 7 years for legal compliance</li>
                      <li><strong>Marketing Data:</strong> Until consent withdrawal + 2 years</li>
                      <li><strong>Transaction Data:</strong> 7 years for tax and legal purposes</li>
                      <li><strong>Website Analytics:</strong> 26 months (anonymized after 14 months)</li>
                      <li><strong>Support Communications:</strong> 3 years after resolution</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <ShieldCheckIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Your Rights and Choices
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">GDPR Rights (EU Residents)</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li><strong>Right of Access:</strong> Request copies of your personal data</li>
                      <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                      <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                      <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                      <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
                      <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">CCPA Rights (California Residents)</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li><strong>Right to Know:</strong> What personal information we collect and how we use it</li>
                      <li><strong>Right to Delete:</strong> Request deletion of personal information</li>
                      <li><strong>Right to Opt-Out:</strong> Opt-out of the sale of personal information</li>
                      <li><strong>Right to Non-Discrimination:</strong> Equal service regardless of privacy choices</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
                  <p className="text-gray-700">
                    <strong>To exercise your rights:</strong> Contact us at {companyData.address.email} with your request. 
                    We will respond within 30 days and may require identity verification.
                  </p>
                </div>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <ExclamationTriangleIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Data Security
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    We implement comprehensive security measures to protect your personal information:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Technical Safeguards</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>SSL/TLS encryption for data transmission</li>
                        <li>Encrypted data storage</li>
                        <li>Regular security audits and penetration testing</li>
                        <li>Secure coding practices</li>
                        <li>Multi-factor authentication for admin access</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Organizational Safeguards</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Employee privacy training</li>
                        <li>Access controls and role-based permissions</li>
                        <li>Data breach response procedures</li>
                        <li>Regular policy reviews and updates</li>
                        <li>Vendor security assessments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Cookies and Tracking */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Cog6ToothIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Cookies and Tracking Technologies
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    We use cookies and similar technologies to enhance your experience. For detailed information, 
                    please see our <Link to="/cookies" className="text-primary-600 hover:text-primary-700 underline">Cookie Policy</Link>.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Cookie Categories</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                      <li><strong>Analytics Cookies:</strong> Help us understand website usage</li>
                      <li><strong>Marketing Cookies:</strong> Used for targeted advertising (with consent)</li>
                      <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* International Transfers */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Data Transfers</h2>
                <p className="text-gray-700 mb-4">
                  Your information may be transferred to and processed in countries other than your country of residence. 
                  We ensure appropriate safeguards are in place, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
                  <li>Adequacy decisions by relevant data protection authorities</li>
                  <li>Certification schemes and codes of conduct</li>
                  <li>Binding corporate rules for intra-group transfers</li>
                </ul>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
                <p className="text-gray-700">
                  Our services are not directed to children under 16 years of age. We do not knowingly collect personal 
                  information from children under 16. If we become aware that we have collected personal information from 
                  a child under 16, we will take steps to delete such information promptly.
                </p>
              </section>

              {/* Policy Updates */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by 
                  posting the new policy on this page and updating the "Last updated" date. We encourage you to review 
                  this policy periodically for any changes.
                </p>
              </section>

              {/* Contact Information */}
              <section className="bg-primary-50 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <EnvelopeIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Contact Us
                </h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy, our data practices, or wish to exercise your rights, please contact us:
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
                    <strong>Supervisory Authority:</strong> If you are not satisfied with our response to your privacy concern, 
                    you have the right to lodge a complaint with your local data protection supervisory authority.
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

export default PrivacyPolicy;