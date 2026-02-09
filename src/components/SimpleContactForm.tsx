import { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

interface SimpleContactFormProps {
  onSubmit?: () => void;
}

const SimpleContactForm = ({ onSubmit }: SimpleContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiry: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically send to your backend
      console.log('Form submitted:', formData);
      
      success('Message Sent!', 'We\'ll get back to you within 24 hours.');
      onSubmit?.();
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        inquiry: 'general',
        message: ''
      });
    } catch {
      error('Failed to Send', 'Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-900 placeholder-neutral-400 hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400/60 focus:ring-offset-2 focus:ring-offset-white focus:border-primary-500 transition-all duration-300 ease-out"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-900 placeholder-neutral-400 hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400/60 focus:ring-offset-2 focus:ring-offset-white focus:border-primary-500 transition-all duration-300 ease-out"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-900 placeholder-neutral-400 hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400/60 focus:ring-offset-2 focus:ring-offset-white focus:border-primary-500 transition-all duration-300 ease-out"
            placeholder="Enter your company name"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-900 placeholder-neutral-400 hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400/60 focus:ring-offset-2 focus:ring-offset-white focus:border-primary-500 transition-all duration-300 ease-out"
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      <div>
        <label htmlFor="inquiry" className="block text-sm font-medium text-neutral-700 mb-2">
          Type of Inquiry <span className="text-red-500">*</span>
        </label>
        <select
          id="inquiry"
          name="inquiry"
          value={formData.inquiry}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-900 placeholder-neutral-400 hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400/60 focus:ring-offset-2 focus:ring-offset-white focus:border-primary-500 transition-all duration-300 ease-out"
        >
          <option value="general">General Inquiry</option>
          <option value="sales">Sales Inquiry</option>
          <option value="support">Technical Support</option>
          <option value="partnership">Partnership</option>
          <option value="careers">Careers</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-900 placeholder-neutral-400 hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400/60 focus:ring-offset-2 focus:ring-offset-white focus:border-primary-500 transition-all duration-300 ease-out resize-y min-h-[120px]"
          placeholder="Tell us about your project or inquiry"
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
};

export default SimpleContactForm;
