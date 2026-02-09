import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ReceiptRefundIcon, ClockIcon, XCircleIcon, CurrencyDollarIcon, DocumentMagnifyingGlassIcon, CreditCardIcon, CalendarDaysIcon, EnvelopeIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import companyData from '../data/companyData';

const RefundPolicy = () => {
  return (
    <div className="bg-neutral-50 section-padding">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-neutral-600 mb-8">
          <Link to="/" className="hover:text-primary-600 active:text-primary-700 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary-300/60 focus:ring-offset-2 focus:ring-offset-white rounded-sm">Home</Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium">Refund Policy</span>
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

        {/* Main Content */}
        <div className="card p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
              <ReceiptRefundIcon className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="heading-page">Refund Policy</h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our refund policy outlines the terms and conditions for refunds, cancellations, and returns of our services and products.
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
                  <ReceiptRefundIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Policy Overview
                </h2>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  At Undash-cop, we strive to provide excellent service and customer satisfaction. This Refund Policy 
                  explains the circumstances under which refunds may be issued, the process for requesting refunds, 
                  and the timeline for processing refunds.
                </p>
                <p className="text-neutral-700 leading-relaxed">
                  By purchasing our services or products, you agree to the terms outlined in this refund policy. 
                  Please read this policy carefully before making any purchases.
                </p>
              </section>

              {/* General Refund Terms */}
              <section>
                <h2 className="heading-section flex items-center">
                  <CurrencyDollarIcon className="h-6 w-6 text-primary-600 mr-3" />
                  General Refund Terms
                </h2>
                <div className="space-y-6">
                  <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <h3 className="text-lg font-medium text-neutral-900 mb-2 flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                      Refund Eligibility
                    </h3>
                    <p className="text-neutral-700">
                      Refunds may be considered under the following circumstances:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700 mt-2 ml-4">
                      <li>Service not delivered as specified in the contract</li>
                      <li>Technical issues preventing service delivery that are our responsibility</li>
                      <li>Material breach of contract by Undash-cop</li>
                      <li>Duplicate payments made in error</li>
                      <li>Services cancelled within the specified cancellation period</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <h3 className="text-lg font-medium text-neutral-900 mb-2 flex items-center">
                      <XCircleIcon className="h-5 w-5 text-red-600 mr-2" />
                      Non-Refundable Items
                    </h3>
                    <p className="text-neutral-700">
                      The following are generally not eligible for refunds:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700 mt-2 ml-4">
                      <li>Services already completed and delivered</li>
                      <li>Custom development work that has been started</li>
                      <li>Third-party software licenses or subscriptions</li>
                      <li>Services cancelled after the specified cancellation period</li>
                      <li>Refunds requested due to change of mind after service commencement</li>
                      <li>Services affected by client-side technical issues or non-cooperation</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Service-Specific Refund Terms */}
              <section>
                <h2 className="heading-section flex items-center">
                  <DocumentMagnifyingGlassIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Service-Specific Refund Terms
                </h2>
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Software Development Services</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-neutral-900">Cancellation Before Development Starts</h4>
                        <p className="text-neutral-700 text-sm">Full refund minus 10% administrative fee</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-900">Cancellation During Development (0-25% complete)</h4>
                        <p className="text-neutral-700 text-sm">75% refund of remaining work</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-900">Cancellation During Development (25-50% complete)</h4>
                        <p className="text-neutral-700 text-sm">50% refund of remaining work</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-900">Cancellation After 50% Complete</h4>
                        <p className="text-neutral-700 text-sm">No refund - work delivered as per milestone</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Consulting Services</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-neutral-900">Hourly Consulting</h4>
                        <p className="text-neutral-700 text-sm">Refund for unused hours within 30 days of purchase</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-900">Project-Based Consulting</h4>
                        <p className="text-neutral-700 text-sm">Proportional refund based on work completed</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-900">Retainer Agreements</h4>
                        <p className="text-neutral-700 text-sm">Refund for unused retainer amount with 30 days notice</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Support and Maintenance</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-neutral-900">Monthly Subscriptions</h4>
                        <p className="text-neutral-700 text-sm">Pro-rated refund for unused portion of current month</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-900">Annual Subscriptions</h4>
                        <p className="text-neutral-700 text-sm">Pro-rated refund for unused months with 30 days notice</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-900">One-time Support</h4>
                        <p className="text-neutral-700 text-sm">No refund after service delivery</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Refund Process */}
              <section>
                <h2 className="heading-section flex items-center">
                  <ClockIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Refund Request Process
                </h2>
                <div className="space-y-4">
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Step 1: Submit Refund Request</h3>
                    <p className="text-neutral-700 mb-3">
                      To request a refund, please contact us at {companyData.address.email} with the following information:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700 ml-4">
                      <li>Your account information and order number</li>
                      <li>Reason for refund request</li>
                      <li>Supporting documentation (if applicable)</li>
                      <li>Preferred refund method</li>
                    </ul>
                  </div>

                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Step 2: Review Process</h3>
                    <p className="text-neutral-700 mb-3">
                      We will review your refund request within 5-7 business days. During this time, we may:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700 ml-4">
                      <li>Verify the details of your request</li>
                      <li>Review project status and deliverables</li>
                      <li>Contact you for additional information if needed</li>
                      <li>Assess compliance with refund policy terms</li>
                    </ul>
                  </div>

                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Step 3: Refund Processing</h3>
                    <p className="text-neutral-700 mb-3">
                      If your refund is approved, we will process it according to the following timeline:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700 ml-4">
                      <li>Credit card refunds: 5-10 business days</li>
                      <li>Bank transfer refunds: 7-14 business days</li>
                      <li>PayPal refunds: 3-5 business days</li>
                      <li>Check refunds: 14-21 business days</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Refund Timeline */}
              <section>
                <h2 className="heading-section flex items-center">
                  <CalendarDaysIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Refund Timeline and Deadlines
                </h2>
                <div className="space-y-4">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">Important Deadlines</h3>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700">
                      <li><strong>Refund requests must be submitted within 30 days</strong> of service completion or issue discovery</li>
                      <li><strong>Service cancellations</strong> must be requested at least 48 hours before scheduled work begins</li>
                      <li><strong>Subscription cancellations</strong> must be requested at least 7 days before the next billing cycle</li>
                      <li><strong>Project cancellations</strong> must be requested before 50% completion milestone</li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-neutral-900 mb-2">Processing Times</h3>
                      <ul className="list-disc list-inside space-y-1 text-neutral-700 text-sm">
                        <li>Initial review: 5-7 business days</li>
                        <li>Approval notification: Within 24 hours of decision</li>
                        <li>Refund processing: 3-14 business days</li>
                        <li>Refund receipt: Varies by payment method</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-neutral-900 mb-2">Communication</h3>
                      <ul className="list-disc list-inside space-y-1 text-neutral-700 text-sm">
                        <li>Email confirmation of receipt</li>
                        <li>Status updates during review</li>
                        <li>Final decision notification</li>
                        <li>Refund completion confirmation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment Method Refunds */}
              <section>
                <h2 className="heading-section flex items-center">
                  <CreditCardIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Payment Method Specific Terms
                </h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-neutral-900 mb-3">Credit/Debit Cards</h3>
                      <ul className="list-disc list-inside space-y-1 text-neutral-700 text-sm">
                        <li>Refunds processed to original payment method</li>
                        <li>Processing time: 5-10 business days</li>
                        <li>May appear as pending transaction initially</li>
                        <li>Contact your bank if not received within 10 days</li>
                      </ul>
                    </div>
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-neutral-900 mb-3">Bank Transfers</h3>
                      <ul className="list-disc list-inside space-y-1 text-neutral-700 text-sm">
                        <li>Refunds sent to original bank account</li>
                        <li>Processing time: 7-14 business days</li>
                        <li>International transfers may take longer</li>
                        <li>Bank fees may apply (deducted from refund)</li>
                      </ul>
                    </div>
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-neutral-900 mb-3">PayPal</h3>
                      <ul className="list-disc list-inside space-y-1 text-neutral-700 text-sm">
                        <li>Refunds processed to PayPal account</li>
                        <li>Processing time: 3-5 business days</li>
                        <li>Instant if PayPal balance available</li>
                        <li>May require bank transfer if insufficient balance</li>
                      </ul>
                    </div>
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-neutral-900 mb-3">Checks</h3>
                      <ul className="list-disc list-inside space-y-1 text-neutral-700 text-sm">
                        <li>Physical check mailed to billing address</li>
                        <li>Processing time: 14-21 business days</li>
                        <li>Requires valid mailing address</li>
                        <li>Check valid for 90 days from issue date</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Dispute Resolution */}
              <section>
                <h2 className="heading-section flex items-center">
                  <ExclamationTriangleIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Dispute Resolution
                </h2>
                <div className="space-y-4">
                  <p className="text-neutral-700">
                    If you disagree with our refund decision, you may request a review by our management team. 
                    Please provide additional documentation or evidence to support your case.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">Dispute Process</h3>
                    <ol className="list-decimal list-inside space-y-1 text-neutral-700 text-sm">
                      <li>Submit written dispute within 14 days of refund decision</li>
                      <li>Include all relevant documentation and evidence</li>
                      <li>Management review within 10 business days</li>
                      <li>Final decision communicated in writing</li>
                      <li>External mediation available if needed</li>
                    </ol>
                  </div>
                </div>
              </section>

              {/* Special Circumstances */}
              <section>
                <h2 className="heading-section flex items-center">Special Circumstances</h2>
                <div className="space-y-4">
                  <div className="bg-red-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">Force Majeure Events</h3>
                    <p className="text-neutral-700 text-sm">
                      In cases of force majeure events (natural disasters, pandemics, government actions), 
                      refund policies may be modified to accommodate exceptional circumstances. 
                      We will communicate any changes promptly.
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">Technical Issues</h3>
                    <p className="text-neutral-700 text-sm">
                      If technical issues on our end prevent service delivery, we will work to resolve them promptly. 
                      If resolution is not possible within 30 days, full refunds will be provided.
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">Client Satisfaction</h3>
                    <p className="text-neutral-700 text-sm">
                      We are committed to client satisfaction. If you are not satisfied with our services, 
                      please contact us immediately. We will work with you to find a satisfactory solution.
                    </p>
                  </div>
                </div>
              </section>

              {/* Policy Updates */}
              <section>
                <h2 className="heading-section flex items-center">Policy Updates</h2>
                <p className="text-neutral-700 mb-4">
                  We reserve the right to update this Refund Policy at any time. Changes will be posted on this page 
                  with an updated "Last modified" date. Continued use of our services after changes constitutes 
                  acceptance of the updated policy.
                </p>
                <div className="bg-neutral-50 rounded-lg p-4">
                  <p className="text-neutral-700 text-sm">
                    <strong>Notification:</strong> Significant changes to this policy will be communicated via email 
                    to all active clients at least 30 days before implementation.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section className="bg-primary-50 rounded-lg p-6">
                <h2 className="heading-section flex items-center">
                  <EnvelopeIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Contact Us for Refunds
                </h2>
                <p className="text-neutral-700 mb-4">
                  For refund requests, questions about this policy, or assistance with the refund process, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="text-neutral-700">
                    <strong>Refund Department:</strong> {companyData.address.email}
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
                    <strong>Response Time:</strong> We aim to respond to all refund requests within 24 hours during business days. 
                    Please include your order number and reason for refund in your communication.
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

export default RefundPolicy;