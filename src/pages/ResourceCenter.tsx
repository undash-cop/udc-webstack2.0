import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import { resourceData, getResourceCategories, getResourceTypes } from '../data/resourceData';

// Simple interface for resource type
interface Resource {
  id: number;
  title: string;
  description: string;
  type: string;
  category: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  downloads: number;
  fileSize: string;
  fileType: string;
  image: string;
  downloadUrl: string;
  featured: boolean;
  tags: string[];
  duration?: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

interface ResourceType {
  id: string;
  name: string;
  count: number;
}
import { 
  DocumentTextIcon, 
  VideoCameraIcon, 
  BookOpenIcon, 
  ArrowDownTrayIcon,
  CalendarIcon,
  UserGroupIcon,
  TagIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const ResourceCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  // Handle download functionality
  const handleDownload = (resource: Resource) => {
    console.log(`Downloading: ${resource.title}`);
    
    // Create content based on resource type
    let content = '';
    let mimeType = 'text/plain';
    let fileExtension = 'txt';
    
    switch (resource.type) {
      case 'Video':
        content = `Video Resource: ${resource.title}\n\nThis would be a video file (${resource.fileType}) in a real application.\n\nDetails:\n- Author: ${resource.author}\n- Duration: ${resource.duration || 'N/A'}\n- File Size: ${resource.fileSize}\n- Published: ${resource.publishedDate}`;
        mimeType = 'text/plain';
        fileExtension = 'txt';
        break;
      case 'Template':
        content = `Title: ${resource.title}\n\n${resource.description}\n\nThis is a template file that would contain:\n- Structured format for ${resource.category.toLowerCase()}\n- Fillable sections\n- Guidelines and instructions\n\nAuthor: ${resource.author}\nFile Type: ${resource.fileType}\nFile Size: ${resource.fileSize}`;
        mimeType = 'text/plain';
        fileExtension = 'txt';
        break;
      case 'Whitepaper':
        content = `Whitepaper: ${resource.title}\n\n${resource.description}\n\nExecutive Summary:\nThis comprehensive whitepaper covers ${resource.category.toLowerCase()} best practices and methodologies.\n\nTable of Contents:\n1. Introduction\n2. Key Concepts\n3. Implementation Strategies\n4. Case Studies\n5. Best Practices\n6. Conclusion\n\nAuthor: ${resource.author}\nPublished: ${resource.publishedDate}\nFile Size: ${resource.fileSize}`;
        mimeType = 'text/plain';
        fileExtension = 'txt';
        break;
      case 'Technical Guide':
        content = `Technical Guide: ${resource.title}\n\n${resource.description}\n\nThis technical guide provides step-by-step instructions for ${resource.category.toLowerCase()} development.\n\nTopics Covered:\n- Fundamentals\n- Advanced Techniques\n- Code Examples\n- Troubleshooting\n- Best Practices\n\nAuthor: ${resource.author}\nFile Type: ${resource.fileType}\nFile Size: ${resource.fileSize}`;
        mimeType = 'text/plain';
        fileExtension = 'txt';
        break;
      default:
        content = `Resource: ${resource.title}\n\n${resource.description}\n\nAuthor: ${resource.author}\nFile Type: ${resource.fileType}\nFile Size: ${resource.fileSize}\nPublished: ${resource.publishedDate}\nTags: ${resource.tags.join(', ')}`;
        mimeType = 'text/plain';
        fileExtension = 'txt';
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resource.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    // Show success message
    alert(`✅ Download started: ${resource.title}\n\nThis is a demo download. In a real application, this would be the actual ${resource.fileType} file.`);
  };

  // Use centralized data
  const categories = getResourceCategories();
  const resourceTypes = getResourceTypes();
  const resources = resourceData;

  const filteredResources = resources.filter((resource: Resource) => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesType = selectedType === 'All' || resource.type === selectedType;
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesType && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'whitepaper':
      case 'technical guide':
      case 'report':
        return <DocumentTextIcon className="h-6 w-6" />;
      case 'video':
        return <VideoCameraIcon className="h-6 w-6" />;
      case 'template':
        return <BookOpenIcon className="h-6 w-6" />;
      default:
        return <DocumentTextIcon className="h-6 w-6" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      <SEOHead
        title="Resource Center - Guides, Templates & Tools"
        description="Access our comprehensive library of resources including whitepapers, guides, templates, and tools to accelerate your business growth."
        keywords="resources, guides, templates, whitepapers, tools, business resources, technology guides"
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Resource Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Access our comprehensive library of resources including whitepapers, guides, templates, 
            and tools to accelerate your business growth and digital transformation.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources, topics, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm">
              <FunnelIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border-none focus:ring-0 text-sm"
              >
                {categories.map((category: Category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm">
              <TagIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by Type:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border-none focus:ring-0 text-sm"
              >
                {resourceTypes.map((type: ResourceType) => (
                  <option key={type.id} value={type.id}>
                    {type.name} ({type.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {filteredResources.length} Resource{filteredResources.length !== 1 ? 's' : ''} Found
            </h2>
            <p className="text-lg text-gray-600">
              Discover valuable resources to help you succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource: Resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                    {resource.type}
                  </div>
                  {resource.featured && (
                    <div className="absolute top-4 right-4 bg-primary-600 text-white px-2 py-1 rounded text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-primary-600">
                      {getTypeIcon(resource.type)}
                    </div>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium">
                      {resource.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <UserGroupIcon className="h-4 w-4" />
                        {resource.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        {formatDate(resource.publishedDate)}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {resource.fileSize}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ArrowDownTrayIcon className="h-4 w-4" />
                      {resource.downloads} downloads
                    </div>
                    <button 
                      onClick={() => handleDownload(resource)}
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                    >
                      Download
                    </button>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-1">
                    {resource.tags.slice(0, 3).map((tag: string, index: number) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                    {resource.tags.length > 3 && (
                      <span className="text-gray-400 text-xs">
                        +{resource.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <MagnifyingGlassIcon className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or browse all resources
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedType('All');
                }}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ResourceCenter;
