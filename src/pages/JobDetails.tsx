import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jobOpeningsData from '../data/jobOpeningsData';
import { 
  MapPinIcon, 
  ClockIcon, 
  BriefcaseIcon,
  AcademicCapIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  HeartIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const JobDetails = () => {
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
  const [isSaved, setIsSaved] = useState(false);

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

  const handleApplyNow = () => {
    navigate(`/apply/${jobId}`);
  };

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    // Here you would typically save to localStorage or send to backend
    console.log('Job saved:', job);
  };

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container-custom py-6">
          <button
            onClick={() => navigate('/careers')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Careers
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <h1 className="text-4xl font-bold text-gray-900">{job.title}</h1>
                <div className="flex space-x-2">
                  {job.featured && (
                    <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  )}
                  {job.urgent && (
                    <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                      Urgent
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg px-4 py-2">
                  <BriefcaseIcon className="w-5 h-5 mr-2 text-primary-600" />
                  <span className="font-medium">{job.department}</span>
                </div>
                <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg px-4 py-2">
                  <MapPinIcon className="w-5 h-5 mr-2 text-primary-600" />
                  <span className="font-medium">{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg px-4 py-2">
                  <ClockIcon className="w-5 h-5 mr-2 text-primary-600" />
                  <span className="font-medium">{job.type}</span>
                </div>
                <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg px-4 py-2">
                  <AcademicCapIcon className="w-5 h-5 mr-2 text-primary-600" />
                  <span className="font-medium">{job.experience}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-primary-600 mb-2">{job.salary}</div>
              <div className="text-sm text-gray-500 mb-4">Posted {job.posted}</div>
              <div className="flex gap-3">
                <button
                  onClick={handleSaveJob}
                  className={`px-4 py-2 rounded-lg border transition-colors flex items-center ${
                    isSaved 
                      ? 'bg-red-50 border-red-300 text-red-600' 
                      : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-red-50 hover:border-red-300 hover:text-red-600'
                  }`}
                >
                  <HeartIcon className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                  {isSaved ? 'Saved' : 'Save Job'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Content */}
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Description */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{job.description}</p>
              </div>

              {/* Key Responsibilities */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Responsibilities</h2>
                <ul className="space-y-4">
                  {job.responsibilities.map((responsibility: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircleIcon className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-lg leading-relaxed">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Skills */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Required Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {job.skills.map((skill: string, index: number) => (
                    <span key={index} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Company Culture */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Work With Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <StarIcon className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Competitive Benefits</h3>
                      <p className="text-gray-600">Health insurance, flexible PTO, and professional development opportunities.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <StarIcon className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Growth Opportunities</h3>
                      <p className="text-gray-600">Clear career paths and mentorship programs to help you advance.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <StarIcon className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Flexible Work</h3>
                      <p className="text-gray-600">Remote work options and flexible hours to support work-life balance.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <StarIcon className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Innovative Projects</h3>
                      <p className="text-gray-600">Work on cutting-edge technology and meaningful projects.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Apply?</h3>
                <p className="text-gray-600 mb-6">
                  Join our team and help us build the future of technology.
                </p>
                <button
                  onClick={handleApplyNow}
                  className="btn-apply w-full text-center py-4 text-lg font-semibold mb-4"
                >
                  Apply Now
                  <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
                </button>
                <button
                  onClick={() => navigate('/send-resume')}
                  className="btn-outline w-full text-center py-3"
                >
                  Send Resume Instead
                </button>
              </div>

              {/* Job Summary */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Job Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Department</span>
                    <span className="font-medium text-gray-900">{job.department}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium text-gray-900">{job.location}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Type</span>
                    <span className="font-medium text-gray-900">{job.type}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-medium text-gray-900">{job.experience}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Salary</span>
                    <span className="font-bold text-primary-600">{job.salary}</span>
                  </div>
                </div>
              </div>

              {/* Share Job */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Share This Job</h3>
                <p className="text-gray-600 mb-4">
                  Know someone who would be perfect for this role?
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Job link copied to clipboard!');
                  }}
                  className="btn-outline w-full text-center py-3"
                >
                  Copy Job Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
