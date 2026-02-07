import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import jobOpeningsData from '../data/jobOpeningsData';
import { API_ENDPOINTS } from '../config/api';
import { 
  MapPinIcon, 
  ClockIcon, 
  BriefcaseIcon,
  AcademicCapIcon,
  ArrowLeftIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

// Zod schema for form validation
const applySchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
    .regex(/^[+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
  currentCompany: z.string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  experience: z.string()
    .min(1, 'Please select your experience level'),
  coverLetter: z.string()
    .max(2000, 'Cover letter must be less than 2000 characters')
    .optional(),
  resume: z.instanceof(File, { message: 'Resume is required' })
    .refine((file) => file?.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(
      (file) => ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file?.type),
      'Only PDF, DOC, and DOCX files are allowed'
    ),
  linkedin: z.string()
    .url('Please enter a valid LinkedIn URL')
    .optional()
    .or(z.literal('')),
  portfolio: z.string()
    .url('Please enter a valid portfolio URL')
    .optional()
    .or(z.literal(''))
});

type ApplyFormData = z.infer<typeof applySchema>;

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<{
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    experience: string;
    salary: string;
    posted: string;
    featured: boolean;
    urgent: boolean;
    description: string;
    skills: string[];
    responsibilities: string[];
  } | null>(null);

  useEffect(() => {
    if (jobId) {
      const foundJob = jobOpeningsData.find(j => j.id === parseInt(jobId));
      if (foundJob) {
        setJob(foundJob);
      } else {
        navigate('/careers');
      }
    }
  }, [jobId, navigate]);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset
  } = useForm<ApplyFormData>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      currentCompany: '',
      experience: '',
      coverLetter: '',
      linkedin: '',
      portfolio: ''
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('resume', file, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: ApplyFormData) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('job_id', jobId || '');
      formData.append('first_name', data.firstName);
      formData.append('last_name', data.lastName);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('current_company', data.currentCompany || '');
      formData.append('experience', data.experience);
      formData.append('cover_letter', data.coverLetter || '');
      formData.append('linkedin', data.linkedin || '');
      formData.append('portfolio', data.portfolio || '');
      formData.append('resume', data.resume);

      // Submit to API
      const response = await fetch(API_ENDPOINTS.APPLICATIONS, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        // Show success toast
        toast.success('Application submitted successfully! We will get back to you soon.', {
          duration: 5000,
          position: 'top-center'
        });

        // Reset form
        reset();

        // Navigate back to careers
        navigate('/careers');
      } else {
        throw new Error(result.error || 'Failed to submit application');
      }

    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to submit application. Please try again.', {
        duration: 5000,
        position: 'top-center'
      });
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container-custom py-6">
          <button
            onClick={() => navigate('/careers')}
            className="flex items-center text-neutral-600 hover:text-neutral-900 mb-4 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Careers
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="heading-page mb-2">Apply for {job.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-neutral-600">
                <div className="flex items-center">
                  <BriefcaseIcon className="w-4 h-4 mr-2 text-primary-600" />
                  <span>{job.department}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-2 text-primary-600" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2 text-primary-600" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center">
                  <AcademicCapIcon className="w-4 h-4 mr-2 text-primary-600" />
                  <span>{job.experience}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600 mb-1">{job.salary}</div>
              <div className="text-sm text-neutral-500">Posted {job.posted}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <div className="card p-8">
            <div className="mb-8">
              <h2 className="heading-section mb-4">Application Form</h2>
              <p className="text-neutral-600">
                Please fill out the form below to apply for this position. All fields marked with * are required.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center">
                  <CheckCircleIcon className="w-5 h-5 mr-2 text-primary-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      {...register('firstName')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.firstName ? 'border-red-500' : 'border-neutral-300'
                      }`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-sm mt-1" role="alert">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      {...register('lastName')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.lastName ? 'border-red-500' : 'border-neutral-300'
                      }`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-600 text-sm mt-1" role="alert">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.email ? 'border-red-500' : 'border-neutral-300'
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-neutral-300'
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1" role="alert">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center">
                  <CheckCircleIcon className="w-5 h-5 mr-2 text-primary-600" />
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Current Company
                    </label>
                    <input
                      type="text"
                      {...register('currentCompany')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.currentCompany ? 'border-red-500' : 'border-neutral-300'
                      }`}
                      placeholder="Enter your current company"
                    />
                    {errors.currentCompany && (
                      <p className="text-red-600 text-sm mt-1" role="alert">
                        {errors.currentCompany.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Years of Experience *
                    </label>
                    <select
                      {...register('experience')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.experience ? 'border-red-500' : 'border-neutral-300'
                      }`}
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                    {errors.experience && (
                      <p className="text-red-600 text-sm mt-1" role="alert">
                        {errors.experience.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Online Presence */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center">
                  <CheckCircleIcon className="w-5 h-5 mr-2 text-primary-600" />
                  Online Presence
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      {...register('linkedin')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.linkedin ? 'border-red-500' : 'border-neutral-300'
                      }`}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                    {errors.linkedin && (
                      <p className="text-red-600 text-sm mt-1" role="alert">
                        {errors.linkedin.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Portfolio/Website
                    </label>
                    <input
                      type="url"
                      {...register('portfolio')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.portfolio ? 'border-red-500' : 'border-neutral-300'
                      }`}
                      placeholder="https://yourportfolio.com"
                    />
                    {errors.portfolio && (
                      <p className="text-red-600 text-sm mt-1" role="alert">
                        {errors.portfolio.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center">
                  <CheckCircleIcon className="w-5 h-5 mr-2 text-primary-600" />
                  Documents
                </h3>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Resume/CV *
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      errors.resume ? 'border-red-500' : 'border-neutral-300'
                    }`}
                  />
                  <p className="text-sm text-neutral-500 mt-2">PDF, DOC, or DOCX files only (Max 5MB)</p>
                  {errors.resume && (
                    <p className="text-red-600 text-sm mt-1" role="alert">
                      {errors.resume.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center">
                  <CheckCircleIcon className="w-5 h-5 mr-2 text-primary-600" />
                  Cover Letter
                </h3>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Why are you interested in this position?
                  </label>
                  <textarea
                    {...register('coverLetter')}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      errors.coverLetter ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  />
                  {errors.coverLetter && (
                    <p className="text-red-600 text-sm mt-1" role="alert">
                      {errors.coverLetter.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => navigate('/careers')}
                  className="px-8 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary px-8 py-3 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
