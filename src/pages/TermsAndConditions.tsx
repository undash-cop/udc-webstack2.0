import { Link } from 'react-router-dom';
import { ArrowLeftIcon, DocumentTextIcon, UserGroupIcon, ShieldExclamationIcon, ScaleIcon, HandRaisedIcon, XCircleIcon, CalendarDaysIcon, EnvelopeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import companyData from '../data/companyData';

const TermsAndConditions = () => {
  return (
    <div className="bg-neutral-50 section-padding">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-neutral-600 mb-8">
          <Link to="/" className="hover:text-primary-600 transition-colors duration-200">Home</Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium">Terms and Conditions</span>
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
        <div className="card p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
              <DocumentTextIcon className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="heading-page">Terms and Conditions</h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Please read these terms carefully before using our services. These terms govern your use of our website and services.
            </p>
            <div className="mt-6 text-sm text-neutral-500">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          {/* Content Sections */}
          <div className="prose prose-lg max-w-none">
            <div className="grid gap-8">
              {/* Introduction */}
              <section className="bg-neutral-50 rounded-lg p-6">
                <h2 className="heading-section flex items-center">
                  <DocumentTextIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Agreement to Terms
                </h2>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") 
                  and Undash-cop Private Limited ("Company," "we," "us," or "our") regarding your use of our website, services, 
                  and any related applications (collectively, the "Services").
                </p>
                <p className="text-neutral-700 leading-relaxed">
                  By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, 
                  you may not access or use our Services.
                </p>
              </section>

              {/* Acceptance of Terms */}
              <section>
                <h2 className="heading-section flex items-center">
                  <HandRaisedIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Acceptance of Terms
                </h2>
                <div className="space-y-4">
                  <p className="text-neutral-700">
                    By using our Services, you represent and warrant that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
                    <li>You are at least 18 years of age or have reached the age of majority in your jurisdiction</li>
                    <li>You have the legal capacity to enter into this agreement</li>
                    <li>You are not prohibited from using our Services under applicable law</li>
                    <li>All information you provide is accurate and current</li>
                    <li>You will comply with all applicable laws and regulations</li>
                  </ul>
                </div>
              </section>

              {/* Services Description */}
              <section>
                <h2 className="heading-section flex items-center">
                  <UserGroupIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Description of Services
                </h2>
                <div className="space-y-4">
                  <p className="text-neutral-700">
                    Undash-cop provides technology solutions and consulting services including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
                    <li>Software development and customization services</li>
                    <li>Technology consulting and advisory services</li>
                    <li>System integration and implementation</li>
                    <li>Technical support and maintenance</li>
                    <li>Cloud computing solutions</li>
                    <li>Data analytics and business intelligence services</li>
                  </ul>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                    <p className="text-neutral-700">
                      <strong>Note:</strong> We reserve the right to modify, suspend, or discontinue any part of our Services 
                      at any time with or without notice.
                    </p>
                  </div>
                </div>
              </section>

              {/* User Obligations */}
              <section>
                <h2 className="heading-section flex items-center">
                  <ScaleIcon className="h-6 w-6 text-primary-600 mr-3" />
                  User Obligations and Prohibited Uses
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Permitted Uses</h3>
                    <p className="text-neutral-700 mb-3">You may use our Services only for lawful purposes and in accordance with these Terms. You agree to:</p>
                    <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
                      <li>Provide accurate and complete information when required</li>
                      <li>Maintain the confidentiality of your account credentials</li>
                      <li>Notify us immediately of any unauthorized use of your account</li>
                      <li>Comply with all applicable laws and regulations</li>
                      <li>Respect the intellectual property rights of others</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Prohibited Uses</h3>
                    <p className="text-neutral-700 mb-3">You agree not to use our Services:</p>
                    <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
                      <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                      <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                      <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                      <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                      <li>To submit false or misleading information</li>
                      <li>To upload or transmit viruses or any other type of malicious code</li>
                      <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                      <li>For any obscene or immoral purpose</li>
                      <li>To interfere with or circumvent the security features of our Services</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="heading-section flex items-center">
                  <ShieldExclamationIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Intellectual Property Rights
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Our Intellectual Property</h3>
                    <p className="text-neutral-700 mb-3">
                      The Services and their original content, features, and functionality are and will remain the exclusive 
                      property of Undash-cop and its licensors. The Services are protected by copyright, trademark, and other 
                      laws. Our trademarks and trade dress may not be used in connection with any product or service without 
                      our prior written consent.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">User Content</h3>
                    <p className="text-neutral-700 mb-3">
                      You retain ownership of any content you submit, post, or display on or through our Services ("User Content"). 
                      By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, 
                      reproduce, modify, adapt, publish, translate, and distribute such content.
                    </p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">Copyright Infringement</h3>
                    <p className="text-neutral-700">
                      If you believe that any content on our Services infringes your copyright, please contact us at {companyData.address.email} 
                      with a detailed description of the alleged infringement.
                    </p>
                  </div>
                </div>
              </section>

              {/* Payment Terms */}
              <section>
                <h2 className="heading-section flex items-center">
                  <ScaleIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Payment Terms and Billing
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Payment Obligations</h3>
                    <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
                      <li>All fees are due in advance unless otherwise specified in a written agreement</li>
                      <li>Payment must be made in the currency specified in your invoice</li>
                      <li>Late payments may incur additional charges as specified in your service agreement</li>
                      <li>We reserve the right to suspend services for non-payment</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Pricing and Changes</h3>
                    <p className="text-neutral-700">
                      We reserve the right to change our pricing at any time. Price changes will be communicated to existing 
                      customers with at least 30 days' notice. Continued use of our Services after price changes constitutes 
                      acceptance of the new pricing.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Refunds</h3>
                    <p className="text-neutral-700">
                      Refund policies are outlined in our separate <Link to="/refund-policy" className="text-primary-600 hover:text-primary-700 underline">Refund Policy</Link>. 
                      Please review this policy before making any payments.
                    </p>
                  </div>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="heading-section flex items-center">
                  <ExclamationTriangleIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Limitation of Liability and Disclaimers
                </h2>
                <div className="space-y-4">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">Important Legal Notice</h3>
                    <p className="text-neutral-700">
                      The following limitations and disclaimers are important legal protections for our company. 
                      Please read them carefully.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Service Availability</h3>
                    <p className="text-neutral-700">
                      We do not guarantee that our Services will be available at all times. We may experience hardware, 
                      software, or other problems or need to perform maintenance related to our Services, resulting in 
                      interruptions, delays, or errors.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Limitation of Liability</h3>
                    <p className="text-neutral-700 mb-3">
                      TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL UNDASH-COP, ITS AFFILIATES, AGENTS, 
                      DIRECTORS, EMPLOYEES, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, 
                      SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF 
                      PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO THE USE 
                      OF OUR SERVICES.
                    </p>
                    <p className="text-neutral-700">
                      OUR TOTAL LIABILITY TO YOU FOR ALL DAMAGES SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 
                      TWELVE (12) MONTHS PRECEDING THE CLAIM.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Warranty Disclaimers</h3>
                    <p className="text-neutral-700">
                      OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER 
                      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS 
                      FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                    </p>
                  </div>
                </div>
              </section>

              {/* Indemnification */}
              <section>
                <h2 className="heading-section flex items-center">
                  <ShieldExclamationIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Indemnification
                </h2>
                <p className="text-neutral-700 mb-4">
                  You agree to defend, indemnify, and hold harmless Undash-cop and its affiliates, officers, directors, 
                  employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, 
                  costs, or debt, and expenses (including attorney's fees) arising from:
                </p>
                <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
                  <li>Your use of our Services</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any third-party right, including without limitation any copyright, property, or privacy right</li>
                  <li>Any claim that your User Content caused damage to a third party</li>
                </ul>
              </section>

              {/* Termination */}
              <section>
                <h2 className="heading-section flex items-center">
                  <XCircleIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Termination
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Termination by You</h3>
                    <p className="text-neutral-700">
                      You may terminate your account at any time by contacting us at {companyData.address.email}. 
                      Upon termination, your right to use our Services will cease immediately.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Termination by Us</h3>
                    <p className="text-neutral-700 mb-3">
                      We may terminate or suspend your account and bar access to our Services immediately, without prior 
                      notice or liability, under our sole discretion, for any reason whatsoever, including without limitation 
                      if you breach these Terms.
                    </p>
                    <p className="text-neutral-700">
                      Upon termination, your right to use our Services will cease immediately. If you wish to terminate 
                      your account, you may simply discontinue using our Services.
                    </p>
                  </div>
                </div>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="heading-section flex items-center">
                  <ScaleIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Governing Law and Dispute Resolution
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Governing Law</h3>
                    <p className="text-neutral-700">
                      These Terms shall be interpreted and governed by the laws of India, without regard to its conflict 
                      of law provisions. Our failure to enforce any right or provision of these Terms will not be considered 
                      a waiver of those rights.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Dispute Resolution</h3>
                    <p className="text-neutral-700 mb-3">
                      Any disputes arising out of or relating to these Terms or our Services shall be resolved through 
                      binding arbitration in accordance with the Arbitration and Conciliation Act, 2015, as amended.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
                      <li>Arbitration shall be conducted in English</li>
                      <li>The seat of arbitration shall be Bangalore, India</li>
                      <li>There shall be one arbitrator appointed by mutual agreement</li>
                      <li>Each party shall bear their own costs unless otherwise determined by the arbitrator</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Force Majeure */}
              <section>
                <h2 className="heading-section">Force Majeure</h2>
                <p className="text-neutral-700">
                  We shall not be liable for any failure or delay in performance under these Terms which is due to fire, 
                  flood, earthquake, elements of nature or acts of God, acts of war, terrorism, strikes, labor disputes, 
                  or any other cause which is beyond our reasonable control.
                </p>
              </section>

              {/* Severability */}
              <section>
                <h2 className="heading-section">Severability</h2>
                <p className="text-neutral-700">
                  If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining 
                  provisions of these Terms will remain in effect. These Terms constitute the entire agreement between 
                  us regarding our Services and supersede and replace any prior agreements we might have between us regarding our Services.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="heading-section flex items-center">
                  <CalendarDaysIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Changes to Terms
                </h2>
                <p className="text-neutral-700">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
                  is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. 
                  What constitutes a material change will be determined at our sole discretion.
                </p>
              </section>

              {/* Contact Information */}
              <section className="bg-primary-50 rounded-lg p-6">
                <h2 className="heading-section flex items-center">
                  <EnvelopeIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Contact Information
                </h2>
                <p className="text-neutral-700 mb-4">
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="text-neutral-700">
                    <strong>Legal Department:</strong> {companyData.address.email}
                  </p>
                  <p className="text-neutral-700">
                    <strong>General Inquiries:</strong> {companyData.address.email}
                  </p>
                  <p className="text-neutral-700">
                    <strong>Phone:</strong> {companyData.address.phoneno}
                  </p>
                  <p className="text-neutral-700">
                    <strong>Address:</strong> {companyData.address.headQuarters}
                  </p>
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <p className="text-sm text-neutral-600">
                    <strong>Legal Notice:</strong> These Terms and Conditions are governed by Indian law. 
                    Any legal proceedings must be conducted in the courts of Bangalore, India.
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

export default TermsAndConditions;